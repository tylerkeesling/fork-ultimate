import { SessionStore, SessionStorePayload } from "@auth0/nextjs-auth0"
import { kv, VercelKV } from "@vercel/kv"

class Store implements SessionStore {
  public store: VercelKV

  constructor() {
    this.store = kv
  }

  async get(id: string): Promise<SessionStorePayload | null | undefined> {
    const session: SessionStorePayload | null = await this.store.get(id)
    return session
  }

  async set(id: string, val: any): Promise<void> {
    if (!id.includes("sub")) {
      await this.store.set(id, val)
    }
    return Promise.resolve()
  }

  async delete(id: string): Promise<void> {
    await this.store.del(id)
    return Promise.resolve()
  }
}

export default Store
