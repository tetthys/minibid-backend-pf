# miniBid-backend

miniBid is a really simple and tiny live P2P bidding platform where everyone can buy and sell their items or services.

This project has started from [Tetthys](https://github.com/tetthys)!

# DEMO LINK

[CLICK HERE!](http://tetthys.ru/)

# Table Of Content

- [miniBid-backend](#minibid-backend)
- [DEMO LINK](#demo-link)
- [Table Of Content](#table-of-content)
- [Main Features](#main-features)
    - [Simple Bidding System](#simple-bidding-system)
    - [Support Multiple Currencies](#support-multiple-currencies)
    - [Real-time Experience With Websocket](#real-time-experience-with-websocket)
    - [Automatic Processing Of Ended Products](#automatic-processing-of-ended-products)
    - [Easy To Expand Payment Class](#easy-to-expand-payment-class)
- [Software Requirements](#software-requirements)
- [Installiation](#installiation)
    - [Install dependency](#install-dependency)
    - [Create `.env` from `.env.copy`](#create-env-from-envcopy)
    - [Open MySQL terminal. Then create `minibid` database table](#open-mysql-terminal-then-create-minibid-database-table)
    - [Set `DATABASE_URL` variable in `.env`](#set-database_url-variable-in-env)
    - [Create a account on FreeCurrencyAPI. Then set `FREE_CURRENCY_API_KEY` variable in `.env`](#create-a-account-on-freecurrencyapi-then-set-free_currency_api_key-variable-in-env)
    - [Seeding](#seeding)
    - [Start scheduler and queue-worker](#start-scheduler-and-queue-worker)
    - [Start development server!](#start-development-server)
- [Code Level Features](#code-level-features)
    - [Haven ( Global App Factory )](#haven--global-app-factory-)
    - [Serene ( Read-Only Custom Model Wrapper )](#serene--read-only-custom-model-wrapper-)
    - [useRequestValue Hook](#userequestvalue-hook)
    - [API Resource Wrapper](#api-resource-wrapper)
    - [AccessToken](#accesstoken)
    - [Auth](#auth)
    - [Log](#log)
    - [Event](#event)
    - [Scheduler](#scheduler)
    - [Job, Queue and Queue Worker](#job-queue-and-queue-worker)
    - [Cache Interface](#cache-interface)
    - [Redis Interface](#redis-interface)
    - [WebSocket Interface](#websocket-interface)
- [Not Implemented](#not-implemented)
    - [PaymentGateway / BankCompany / Balance classes](#paymentgateway--bankcompany--balance-classes)
    - [EmailCode / PhoneNumberCode Classes](#emailcode--phonenumbercode-classes)
    - [Profile Setting API ( Change Email, Change PhoneNumber, Change Password, Create or Update Profile Picture )](#profile-setting-api--change-email-change-phonenumber-change-password-create-or-update-profile-picture-)
- [Added Soon](#added-soon)
    - [Separated WebSocket Process](#separated-websocket-process)
    - [Replace QueueWorker with RabbitMQ](#replace-queueworker-with-rabbitmq)
    - [Reducing `as any` bullet](#reducing-as-any-bullet)


# Main Features

### Simple Bidding System

User must need to register their card to place a bid. If he sold something, He needs a bank account to withdraw money.

### Support Multiple Currencies

By supporting 33 currencies, we have expanded the range of users. This uses FreeCurrencyAPI. You can change it to one that supports more currencies.

### Real-time Experience With Websocket

Real-time is really important on bidding platform. Think of live chat, notification and an auction page in progress. It's essential for things like this.

### Automatic Processing Of Ended Products

Scheduler and QueueWorker process them in background.

### Easy To Expand Payment Class

Since payment systems are very different, **We have not implemented some classes. Instead, we have extracted some core methods.** If you use any real Payment Gateway API such as Stripe or Toss, It wouldn't be difficult to implement.

# Software Requirements

```
NodeJS v20.4.0

MySQL v8.3.0

Redis
```

# Installiation

### Install dependency

```
npm install
```

### Create `.env` from `.env.copy`

You must have to do this.

### Open MySQL terminal. Then create `minibid` database table

```
mysql -u root -p
```

```
CREATE DATABASE minibid
```

```
exit
```

### Set `DATABASE_URL` variable in `.env`

If you have no password in MySQL, Just use the value from `.env.copy`

```
DATABASE_URL="mysql://root:@localhost:3306/minibid"
```

Or below

```
DATABASE_URL="mysql://root:password@localhost:3306/minibid"
```

### Create a account on FreeCurrencyAPI. Then set `FREE_CURRENCY_API_KEY` variable in `.env`

This app uses [FreeCurrencyAPI](https://freecurrencyapi.com/). You need to register and then set up `FREE_CURRENCY_API_KEY` variable.

### Seeding

You need to create tables.

```
npx prisma db push
```

Start `seed.ts`, wait until it's over

```
npx ts-node-dev ./src/seed/seed.ts
```

### Start scheduler and queue-worker

We need to run a `scheduler-start.ts` and `queue-worker-start.ts` to handle something in the background. Use a linux package like [tmux](https://github.com/tmux/tmux/wiki)

```
// run on shell #1

npx ts-node-dev ./src/background/scheduler-start.ts
```

```
// run on shell #2

npx ts-node-dev ./src/background/queue-worker-start.ts
```

### Start development server!

```
npm run dev
```

**DONE!**

You can customize your needs now.

# Code Level Features

### Haven ( Global App Factory )

```
Haven.Auth()...
Haven.Password()...
Haven.Log()...
Haven.Cache()...
Haven.Redis()...
```

I actually tried to provide a useful interface to all classes without `new` keyword. I was inspired from [Laravel Facade](https://laravel.com/docs/10.x/facades). It can let you accessible any classes by static method. Interesting. But Typescript doesn't have a static magic method. Even if I can implement, I need to fix prototype. So I gave up and created static app factory class so called `Haven`. The advantages of `Haven` are :

- You don't need `new` keyword.
- In case of a singleton, no need to call the `getInstance` method. Just use it.
- It is recognized very well in code editor.

Of course, You can instanciate manually. No problem.

### Serene ( Read-Only Custom Model Wrapper )

```
const result = await Serene.user()
  .where({
    id: userId,
  })
  .with({
    countOfUserBought: true,
    countOfUserSold: true,
  })
  .get();
```

```
const result = await Serene.users()
  .with({
    sumOfUserBought: true,
    sumOfUserSold: true,
  })
  .page(page)
  .get(15);
```

Prisma lacks useful things for web developer. Especially for custom field for a model that require raw SQL. So I made custom model wrapper class.

All you have to do is define a custom field and register it in a class that extends the `Plural` or `Singular` abstract class.

But it has a flaw. **It loses type tracking of the result**. This is because Typescript doesn't support function overloading and the Prisma team doesn't provide proper type utilities.

If you want other operations such as Create, Update and Delete,

```
await Serene.prisma().card.create({
  data: {
    info: '1234',
    user: {
      connect: {
        id: userId,
      },
    },
  },
});
```

Use `Serene.prisma()`, You can directly access `PrismaClient` instance.

### useRequestValue Hook

```
router.get("/users/:userId", async (req: Request, res: Response, next: NextFunction) => {
      const { userId } = useRequestValue(req);
```

```
router.get("/users/username/:username", async (req: Request, res: Response, next: NextFunction) => {
      const { username, token } = useRequestValue(req);
```

`useRequestValue` hook is really useful. All you have to do is just pick some values then use it. Commonly used values are :

- `page` : pagination query parameter from `req.query.page`
- `token` : authorization token from `req.headers.authorization`
- `cbody` : body with camelized key

If something is duplicated, it throws `RequestCannotBeDestructedError`. So don't worry.

### API Resource Wrapper

```
const w = await new ConvertToUserCurrency()
  .setRequest(req)
  .setResult(r)
  .get();
```

What is `w`?. It is abbreviation of `wrappedResult`. You can convert api response field by wrapping class. It is quite similar to the decorator pattern. You can also wrap additional class dynamically like decorator.

Example :

```
const w = await new FooWrapper(new BarWrapper())
  .setResult(req)
  .get();
```

### AccessToken

This app uses simple authorization system based on relational database. No thrid party library or API needed.

```
User
    - id

AccessToken
    - id
    - userId -> User.id
```

`AccessToken` is reposible for managing token. Below are commonly used methods :

```
await Haven.AccessToken().setUser(user).create();
```

```
await Haven.AccessToken().findUserByToken(token);
```

### Auth

```
Haven.Auth().userId()
Haven.Auth().username()
```

This can be used when you want only the person with that userId or username to have access to the route. `Auth` just returns a middleware which simply follows the flow of ExpressJS.

Also supports protection based on role

```
Haven.Auth().allow("user")
```

```
Haven.Auth().allow("admin")
```

### Log

```
Haven.Log().error(e)
```

`Log` just logs something into `/logs/app.log`. It uses [pino](https://github.com/pinojs/pino).

You can choose 8 levels. :

- `Haven.Log().emergency()`
- `Haven.Log().alert()`
- `Haven.Log().critical()`
- `Haven.Log().error()`
- `Haven.Log().warning()`
- `Haven.Log().notice()`
- `Haven.Log().info()`
- `Haven.Log().debug()`

### Event

```
Event.occur(new UserPlaceBid().from(user).to(seller).for(amount));
```

You can define a custom event and then occur at any place.

Which responsibilty does CustomEvent have? It depends on you. You can simply place your busineess logic on there or enqueue `Job`.

But I defined some abstract methods in `CustomEvent` abstract class that guides you can grasp

```
  abstract business(): Promise<void>;

  abstract notifyToDB(): Promise<void>;

  abstract push(): Promise<void>;
```

Once again, it's up to you.

### Scheduler

```
// scheduler-start.ts

setInterval(() => {
  Haven.Scheduler().trigger();
}, 1000);

Haven.Scheduler().command(new UpdateExchangeRate()).everyDay();
```

No need to set up `cron`. It's really simple and intuitive. Just define a command you need and register it by `Haven.Scheduler().command(new DoBusiness())` on `./src/background/scheduler-start.ts`.

Also, `Haven.Scheduler()` returns singletone instance of `Scheduler`.

> If you push something to websocket client inside the command, it will not work. Runs in another process. I will replace this with the message-based structure.

### Job, Queue and Queue Worker

```
await Haven.Queue().enqueue(new CreateUserCheckout(userId, checkoutId));
await Haven.Queue().enqueue(new WithdrawToSeller(withdrawalId));
```

Above, `new CreateUserCheckout(userId, checkoutId)` and `new WithdrawToSeller(withdrawalId)` are `jobs` and `Haven.Queue()` is `queue`

Things that depend on network or computation can be encapsulated as `job` and sent to `queue`. Representative examples are sending email and rendering something.

I created a really simple `queue`. It's actually `job` table in this database.

```
model Job {
    id BigInt @id @default(autoincrement())

    payload String @db.Text

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}
```

You can define your job by extending `Job` abstract class.

```
// Job.ts

abstract handle(): Promise<void>;
```

In abtract `handle` method, You mainly code your business logic.

By running,

```
npx ts-node-dev ./src/background/queue-worker-start.ts
```

`QueueWorker` will instanciate your job class in another process then handle it.

> If you push something to websocket client inside the job same as command, it will not work. Runs in another process. I will replace this with the message-based structure.

> The current system doesn't handlep FailedJob. We will make overall improvements using RabbitMQ.

### Cache Interface

```
const result = await Haven.Cache().get(
  key,
  async () => await Haven.Cache().forOneMinute().set(key, value)
);
```

No need to know redis commands. Just remember `get` and `set`.

### Redis Interface

```
Haven.Redis.hset(...)
Haven.Redis.sadd(...)
```

Not satisfied with `Cache`? Just directly use `Redis`.

### WebSocket Interface

```
Haven.WSC().pathname("/notification").forAll(client => {
  client.ws.send(
      json({
        type: 'server.broadcast:something',
        data: {
          // something
        }
    })
  )
})
```

Want to push something to your clients? You can use the WSC class.

# Not Implemented

### PaymentGateway / BankCompany / Balance classes

Depending on some specific APIs, This is implemented as stub. But read the comments. It won't be that difficult to actually implement.

### EmailCode / PhoneNumberCode Classes

Same as Payment Class, This is also implemented as stub for same reason. It won't be difficult too.

### Profile Setting API ( Change Email, Change PhoneNumber, Change Password, Create or Update Profile Picture )

I intentionally didn't define them. This is to prevent dependency on stubs.

# Added Soon

### Separated WebSocket Process

Other processes can't access WebSocket clients. It is likely to make it diffcult to expand and cause some performance problems, so we will change it soon.

### Replace QueueWorker with RabbitMQ

The current system doesn't handle FailedJob. We will make overall improvements using RabbitMQ.

### Reducing `as any` bullet

Sorry, I just used `any` type to speed up my development and test time.