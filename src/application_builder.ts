import fastify, { FastifyInstance } from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'path'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import SessionStore from './services/session_store'
import { User } from './models/user'
import registerAuthenticationController from './controllers/authentication'
import registerAccountsController from './controllers/accounts'
import { compileFile } from 'pug'
import registerSavingsController from './controllers/savings'
import registerGoalsController from './controllers/goals'

type ApplicationLocals = {
  user: User
}

declare module 'fastify' {
  interface FastifyRequest {
    locals: ApplicationLocals
  }
}

export class ApplicationBuilder {
  private readonly application: FastifyInstance
  private readonly cookieSecret: string

  constructor() {
    if (!process.env.COOKIE_SECRET) {
      throw Error('must set COOKIE_SECRET')
    }

    this.cookieSecret = process.env.COOKIE_SECRET

    this.application = fastify({
      logger: true,
    })
  }

  public async getApplication() {
    await this.application.register(fastifyStatic, {
      root: path.join(__dirname, '../public'),
    })

    this.application.get('/frontend.js', async (req, reply) => {
      await reply.sendFile('frontend.js')
      return
    })

    this.application.get('/app.css', async (req, reply) => {
      await reply.sendFile('app.css')
      return
    })

    await this.application.register(fastifyCookie)
    await this.application.register(fastifySession, {
      cookieName: 'sessionId',
      secret: this.cookieSecret,
      rolling: true,
      cookie: { secure: process.env.ENV === 'production' },
      store: new SessionStore(),
    })

    this.application.decorateRequest('locals', null)
    this.application.addHook('onRequest', (request, reply, done) => {
      request.locals = { user: new User() }
      return done()
    })

    registerAuthenticationController(this.application)
    registerAccountsController(this.application)
    registerSavingsController(this.application)
    registerGoalsController(this.application)

    const template = compileFile('./src/views/index.pug')

    const catchAllRoutes = ['/', '/accounts*', '/savings*', '/goals*']
    for (const routeUrl of catchAllRoutes) {
      this.application.get(routeUrl, async (request, reply) => {
        await reply.type('text/html').send(template())
      })
    }

    return this.application
  }
}
