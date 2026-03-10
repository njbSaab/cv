# 🏛️ Архитектурные паттерны проекта

## 📋 Содержание

1. [CQRS Pattern](#cqrs-pattern)
2. [Domain-Driven Design](#domain-driven-design)
3. [GRASP Principles](#grasp-principles)
4. [Layered Architecture](#layered-architecture)
5. [Dependency Injection](#dependency-injection)

---

## 🔄 CQRS Pattern

**Command Query Responsibility Segregation** — разделение операций чтения (Query) и записи (Command).

### Почему CQRS?

```typescript
// ❌ БЕЗ CQRS — всё в одном сервисе
@Injectable()
export class QuizzesService {
  async findAll() { /* SELECT */ }
  async findOne(id) { /* SELECT */ }
  async create(dto) { /* INSERT */ }
  async update(id, dto) { /* UPDATE */ }
  async delete(id) { /* DELETE */ }
}

// Проблемы:
// - Сложно тестировать
// - Нарушение Single Responsibility
// - Невозможно масштабировать чтение и запись отдельно
```

### ✅ С CQRS

```typescript
// Query Service — ТОЛЬКО чтение
@Injectable()
export class QuizzesQueryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: QuizMapper,
  ) {}

  async findAll(): Promise<QuizModel[]> {
    const quizzes = await this.prisma.quiz.findMany({
      include: { questions: { include: { answers: true } } }
    });
    return quizzes.map(q => this.mapper.toDomain(q));
  }

  async findById(id: number): Promise<QuizModel | null> {
    const quiz = await this.prisma.quiz.findUnique({ 
      where: { id },
      include: { questions: { include: { answers: true } } }
    });
    return quiz ? this.mapper.toDomain(quiz) : null;
  }
}

// Command Service — ТОЛЬКО запись
@Injectable()
export class QuizzesCommandService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: QuizMapper,
  ) {}

  async create(dto: CreateQuizDto): Promise<QuizModel> {
    const quiz = await this.prisma.quiz.create({
      data: { /* ... */ },
      include: { questions: { include: { answers: true } } }
    });
    return this.mapper.toDomain(quiz);
  }

  async update(id: number, dto: UpdateQuizDto): Promise<QuizModel> {
    const updated = await this.prisma.quiz.update({
      where: { id },
      data: { /* ... */ }
    });
    return this.mapper.toDomain(updated);
  }
}

// Orchestrator — координирует Query и Command
@Injectable()
export class QuizzesService {
  constructor(
    private readonly queryService: QuizzesQueryService,
    private readonly commandService: QuizzesCommandService,
    private readonly mapper: QuizMapper,
  ) {}

  async findOne(id: number): Promise<QuizResponseDto> {
    const model = await this.queryService.findById(id);
    if (!model) throw new NotFoundException();
    
    // Применяем бизнес-логику
    if (model.questions) {
      model.questions.forEach(q => {
        q.answers = q.shuffleAnswers();
      });
    }
    
    return this.mapper.toResponse(model);
  }

  async toggleActive(id: number): Promise<QuizResponseDto> {
    const model = await this.queryService.findById(id);
    if (!model) throw new NotFoundException();
    
    // Бизнес-правила в Domain Model
    model.toggleActive();
    
    // Сохраняем через Command
    const updated = await this.commandService.toggleActive(id);
    return this.mapper.toResponse(updated);
  }
}
```

### Преимущества CQRS

✅ **Четкое разделение ответственности**
```typescript
// Легко найти все операции чтения
QuizzesQueryService → findAll(), findById(), findActive()

// Легко найти все операции записи
QuizzesCommandService → create(), update(), delete()
```

✅ **Простота тестирования**
```typescript
describe('QuizzesQueryService', () => {
  it('should return all quizzes', async () => {
    // Тестируем ТОЛЬКО чтение
    const quizzes = await service.findAll();
    expect(quizzes).toBeDefined();
  });
});

describe('QuizzesCommandService', () => {
  it('should create quiz', async () => {
    // Тестируем ТОЛЬКО запись
    const quiz = await service.create(dto);
    expect(quiz.id).toBeDefined();
  });
});
```

✅ **Масштабируемость**
```typescript
// Можно кэшировать ТОЛЬКО Query
@UseInterceptors(CacheInterceptor)
@Get()
async findAll() {
  return this.queryService.findAll(); // Кэшируется
}

@Post()
async create(@Body() dto) {
  return this.commandService.create(dto); // НЕ кэшируется
}
```

---

## 🎯 Domain-Driven Design (DDD)

### Слои архитектуры

```
┌─────────────────────────────────────┐
│  Presentation Layer (Controller)    │  ← HTTP запросы/ответы
├─────────────────────────────────────┤
│  Application Layer (Service)        │  ← Оркестрация, use cases
├─────────────────────────────────────┤
│  Domain Layer (Models)               │  ← Бизнес-логика
├─────────────────────────────────────┤
│  Infrastructure Layer (Prisma)       │  ← БД, внешние сервисы
└─────────────────────────────────────┘
```

### Domain Model — сердце бизнес-логики

```typescript
// ✅ Domain Model содержит бизнес-правила
export class QuizModel {
  id: number;
  title: string;
  isActive: boolean;
  questions: QuestionModel[];

  // ────────────────────────────────────
  // Бизнес-методы (НЕ геттеры!)
  // ────────────────────────────────────

  isPlayable(): boolean {
    return this.isActive && this.hasQuestions();
  }

  hasQuestions(): boolean {
    return this.questions && this.questions.length > 0;
  }

  toggleActive(): void {
    // ✅ Валидация ВНУТРИ модели
    if (!this.isActive && !this.hasQuestions()) {
      throw new Error('Cannot activate quiz without questions');
    }
    this.isActive = !this.isActive;
  }

  canShowOnMain(): boolean {
    return this.isMainView && this.isActive && this.hasQuestions();
  }
}
```

### Почему бизнес-логика в Domain Model?

#### ❌ БЕЗ DDD — логика в Service

```typescript
@Injectable()
export class QuizzesService {
  async toggleActive(id: number) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id } });
    
    // ❌ Бизнес-логика размазана по Service
    if (!quiz.isActive && quiz.questions.length === 0) {
      throw new Error('Cannot activate quiz without questions');
    }
    
    await this.prisma.quiz.update({
      where: { id },
      data: { isActive: !quiz.isActive }
    });
  }
  
  async canShowOnMain(id: number) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id } });
    
    // ❌ Дублирование логики
    return quiz.isMainView && quiz.isActive && quiz.questions.length > 0;
  }
}
```

**Проблемы:**
- Бизнес-правила размазаны по разным методам
- Дублирование кода
- Сложно тестировать
- Невозможно переиспользовать

#### ✅ С DDD — логика в Model

```typescript
@Injectable()
export class QuizzesService {
  async toggleActive(id: number) {
    const model = await this.queryService.findById(id);
    
    // ✅ Вся логика ВНУТРИ модели
    model.toggleActive(); // Может выбросить ошибку
    
    const updated = await this.commandService.toggleActive(id);
    return this.mapper.toResponse(updated);
  }
  
  async findForMainPage() {
    const models = await this.queryService.findForMainPage();
    
    // ✅ Фильтрация через бизнес-метод
    const playableQuizzes = models.filter(quiz => quiz.canShowOnMain());
    
    return this.mapper.toResponseArray(playableQuizzes);
  }
}
```

**Преимущества:**
- ✅ Бизнес-правила в одном месте
- ✅ Легко тестировать
- ✅ Переиспользование
- ✅ Понятный код

### Тестирование Domain Models

```typescript
describe('QuizModel', () => {
  describe('toggleActive', () => {
    it('should activate quiz with questions', () => {
      const quiz = new QuizModel({
        isActive: false,
        questions: [new QuestionModel({ id: 1, text: 'Q1' })]
      });
      
      // Бизнес-правило выполняется
      expect(() => quiz.toggleActive()).not.toThrow();
      expect(quiz.isActive).toBe(true);
    });

    it('should not activate quiz without questions', () => {
      const quiz = new QuizModel({
        isActive: false,
        questions: []
      });
      
      // Бизнес-правило нарушается
      expect(() => quiz.toggleActive()).toThrow(
        'Cannot activate quiz without questions'
      );
    });
  });

  describe('canShowOnMain', () => {
    it('should return true for active main quiz with questions', () => {
      const quiz = new QuizModel({
        isActive: true,
        isMainView: true,
        questions: [new QuestionModel({ id: 1 })]
      });
      
      expect(quiz.canShowOnMain()).toBe(true);
    });

    it('should return false if not active', () => {
      const quiz = new QuizModel({
        isActive: false,
        isMainView: true,
        questions: [new QuestionModel({ id: 1 })]
      });
      
      expect(quiz.canShowOnMain()).toBe(false);
    });
  });
});
```

---

## 📐 GRASP Principles

**GRASP** = General Responsibility Assignment Software Patterns

### 1. Information Expert

> "Назначай ответственность тому, кто знает информацию"

```typescript
// ✅ QuizModel ЗНАЕТ о своих вопросах
export class QuizModel {
  questions: QuestionModel[];

  getQuestionCount(): number {
    return this.questions?.length || 0; // Expert знает
  }

  hasQuestions(): boolean {
    return this.getQuestionCount() > 0; // Использует своё знание
  }
}

// ✅ QuestionModel ЗНАЕТ о своих ответах
export class QuestionModel {
  answers: AnswerModel[];

  shuffleAnswers(): AnswerModel[] {
    if (!this.answers) return [];
    const shuffled = [...this.answers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  getCorrectAnswer(): AnswerModel | null {
    return this.answers?.find(a => a.isCorrect) || null;
  }
}
```

### 2. Creator

> "Кто должен создавать объекты?"

```typescript
// ✅ Module СОЗДАЕТ и связывает зависимости
@Module({
  imports: [QuizzesModule, UsersModule],
  controllers: [QuizResultsController],
  providers: [
    QuizResultsService,
    QuizResultsQueryService,
    QuizResultsCommandService,
    QuizResultMapper,
    PrismaService,
  ],
  exports: [QuizResultsService],
})
export class QuizResultsModule {}

// ✅ Factory методы в Domain Models
export class QuizResultModel {
  static create(data: {
    quizId: number;
    userId: string;
    score: number;
  }): QuizResultModel {
    return new QuizResultModel({
      ...data,
      id: 0,
      createdAt: new Date(),
    });
  }

  static fromPrisma(prismaResult: any): QuizResultModel {
    return new QuizResultModel({
      id: prismaResult.id,
      score: prismaResult.score,
      // ...
    });
  }
}
```

### 3. Controller (Orchestrator)

> "Кто координирует операции?"

```typescript
// ✅ Service КООРДИНИРУЕТ Query, Command, Mappers
@Injectable()
export class QuizzesService {
  constructor(
    private readonly queryService: QuizzesQueryService,
    private readonly commandService: QuizzesCommandService,
    private readonly mapper: QuizMapper,
    private readonly cacheInterceptor: CacheInterceptor,
  ) {}

  async toggleActive(id: number): Promise<QuizResponseDto> {
    // 1. Получаем данные через Query
    const model = await this.queryService.findById(id);
    if (!model) throw new NotFoundException();

    // 2. Применяем бизнес-логику через Model
    try {
      model.toggleActive();
    } catch (error) {
      throw error;
    }

    // 3. Сохраняем через Command
    const updated = await this.commandService.toggleActive(id);

    // 4. Инвалидируем кэш
    this.cacheInterceptor.invalidate('quizzes');

    // 5. Возвращаем DTO через Mapper
    return this.mapper.toResponse(updated);
  }
}
```

### 4. Pure Fabrication

> "Создавай искусственные классы для разделения ответственности"

```typescript
// ✅ QueryService — искусственный класс для чтения
@Injectable()
export class QuizzesQueryService {
  // НЕ является Domain Model
  // НЕ содержит бизнес-логики
  // ТОЛЬКО доступ к БД
  
  async findAll(): Promise<QuizModel[]> { }
  async findById(id: number): Promise<QuizModel | null> { }
}

// ✅ Mapper — искусственный класс для преобразований
@Injectable()
export class QuizMapper {
  // ТОЛЬКО преобразования
  toDomain(prisma: any): QuizModel { }
  toResponse(model: QuizModel): QuizResponseDto { }
}

// ✅ CacheInterceptor — искусственный класс для кэша
@Injectable()
export class CacheInterceptor {
  // ТОЛЬКО кэширование
  intercept(context, next) { }
  invalidate(prefix?: string) { }
}
```

---

## 🏗️ Layered Architecture

```
┌────────────────────────────────────────────┐
│        Presentation Layer                  │
│  ┌──────────────────────────────────────┐  │
│  │  QuizzesController                   │  │
│  │  - Routing                           │  │
│  │  - Request/Response                  │  │
│  │  - Guards, Interceptors              │  │
│  └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
                    ↓
┌────────────────────────────────────────────┐
│        Application Layer                   │
│  ┌──────────────────────────────────────┐  │
│  │  QuizzesService (Orchestrator)       │  │
│  │  - Use cases                         │  │
│  │  - Координация Query/Command         │  │
│  │  - Применение бизнес-правил          │  │
│  └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
                    ↓
┌────────────────────────────────────────────┐
│        Domain Layer                        │
│  ┌──────────────────────────────────────┐  │
│  │  QuizModel                           │  │
│  │  - Бизнес-логика                     │  │
│  │  - Валидация                         │  │
│  │  - Инварианты                        │  │
│  └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
                    ↓
┌────────────────────────────────────────────┐
│     Infrastructure Layer                   │
│  ┌─────────────┬────────────┬───────────┐  │
│  │ Query       │ Command    │ Mapper    │  │
│  │ Service     │ Service    │           │  │
│  │ (SELECT)    │ (INSERT/   │ (Convert) │  │
│  │             │  UPDATE/   │           │  │
│  │             │  DELETE)   │           │  │
│  └─────────────┴────────────┴───────────┘  │
│  ┌──────────────────────────────────────┐  │
│  │  PrismaService (ORM)                 │  │
│  └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
                    ↓
┌────────────────────────────────────────────┐
│           Database (MySQL)                 │
└────────────────────────────────────────────┘
```

### Поток данных

#### READ (Query)

```
HTTP GET /api/quizzes/1
         ↓
QuizzesController.findOne(1)
         ↓
QuizzesService.findOne(1)
         ↓
QuizzesQueryService.findById(1)
         ↓
PrismaService.quiz.findUnique()
         ↓
         MySQL SELECT
         ↓
Prisma Entity (БД объект)
         ↓
QuizMapper.toDomain()
         ↓
QuizModel (бизнес-логика)
         ↓
QuizMapper.toResponse()
         ↓
QuizResponseDto
         ↓
HTTP 200 JSON
```

#### WRITE (Command)

```
HTTP POST /api/quizzes
         ↓
QuizzesController.create(dto)
         ↓
QuizzesService.create(dto)
         ↓
QuizzesCommandService.create(dto)
         ↓
PrismaService.quiz.create()
         ↓
         MySQL INSERT
         ↓
Prisma Entity
         ↓
QuizMapper.toDomain()
         ↓
QuizModel
         ↓
QuizMapper.toResponse()
         ↓
QuizResponseDto
         ↓
HTTP 201 JSON
```

---

## 💉 Dependency Injection

### Иерархия зависимостей

```typescript
@Module({
  providers: [
    // Высокий уровень (зависит от всех)
    QuizzesService,
    
    // Средний уровень
    QuizzesQueryService,
    QuizzesCommandService,
    
    // Низкий уровень (не зависит ни от кого)
    QuizMapper,
    PrismaService,
  ],
})
export class QuizzesModule {}
```

### Инъекция в конструктор

```typescript
@Injectable()
export class QuizzesService {
  constructor(
    private readonly queryService: QuizzesQueryService,
    private readonly commandService: QuizzesCommandService,
    private readonly mapper: QuizMapper,
    private readonly cacheInterceptor: CacheInterceptor,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(QuizzesService.name);
  }
}
```

### Почему DI важен?

✅ **Тестируемость**
```typescript
describe('QuizzesService', () => {
  let service: QuizzesService;
  let queryService: jest.Mocked<QuizzesQueryService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        QuizzesService,
        {
          provide: QuizzesQueryService,
          useValue: {
            findById: jest.fn(), // Mock
          },
        },
      ],
    }).compile();

    service = module.get(QuizzesService);
    queryService = module.get(QuizzesQueryService);
  });

  it('should find quiz', async () => {
    queryService.findById.mockResolvedValue(mockQuiz);
    const result = await service.findOne(1);
    expect(result).toBeDefined();
  });
});
```

✅ **Гибкость**
```typescript
// Легко заменить реализацию
@Module({
  providers: [
    {
      provide: 'CACHE_SERVICE',
      useClass: process.env.NODE_ENV === 'production' 
        ? RedisCacheService 
        : MemoryCacheService,
    },
  ],
})
```

---

## 📊 Сравнение подходов

### Без паттернов

```typescript
// ❌ Всё в одном месте
@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async toggleActive(id: number) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id } });
    
    if (!quiz) throw new NotFoundException();
    
    // Бизнес-логика размазана
    if (!quiz.isActive && quiz.questions.length === 0) {
      throw new Error('Cannot activate');
    }
    
    const updated = await this.prisma.quiz.update({
      where: { id },
      data: { isActive: !quiz.isActive }
    });
    
    // Ручное преобразование
    return {
      id: updated.id,
      title: updated.title,
      isActive: updated.isActive,
      // ...
    };
  }
}
```

**Проблемы:**
- Нарушение SRP (Single Responsibility)
- Нельзя тестировать бизнес-логику отдельно
- Дублирование кода
- Сложно масштабировать

### С паттернами

```typescript
// ✅ CQRS + DDD + GRASP
@Injectable()
export class QuizzesService {
  constructor(
    private readonly queryService: QuizzesQueryService,
    private readonly commandService: QuizzesCommandService,
    private readonly mapper: QuizMapper,
  ) {}

  async toggleActive(id: number): Promise<QuizResponseDto> {
    // Query
    const model = await this.queryService.findById(id);
    if (!model) throw new NotFoundException();
    
    // Domain Logic
    model.toggleActive(); // Может выбросить ошибку
    
    // Command
    const updated = await this.commandService.toggleActive(id);
    
    // Mapper
    return this.mapper.toResponse(updated);
  }
}

// Domain Model
export class QuizModel {
  toggleActive(): void {
    if (!this.isActive && !this.hasQuestions()) {
      throw new Error('Cannot activate quiz without questions');
    }
    this.isActive = !this.isActive;
  }
}
```

**Преимущества:**
- ✅ Четкое разделение ответственности
- ✅ Бизнес-логика тестируется отдельно
- ✅ Переиспользование кода
- ✅ Легко масштабировать

---

## 🎓 Ключевые выводы

1. **CQRS** → Разделяй чтение и запись
2. **DDD** → Бизнес-логика в Domain Models
3. **GRASP** → Правильное распределение ответственности
4. **Layered** → Четкое разделение слоев
5. **DI** → Внедрение зависимостей через конструктор

**Следуя этим паттернам, вы получаете:**
- 🧪 Легко тестируемый код
- 📈 Масштабируемую архитектуру
- 🔧 Поддерживаемую кодовую базу
- 🚀 Быструю разработку новых фичей
