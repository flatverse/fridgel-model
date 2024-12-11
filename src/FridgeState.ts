import { Referencable } from "./Ref";

export const CURRENT_VERSION = 0

export interface SerializedFridgeState {
  version: number
  references: Referencable<string>[]
}

export class FridgeState {
  private refsById:Record<string,Referencable<string>> = {}
  private refsByType:Record<string,Referencable<string>[]> = {}

  readonly messages:{level:"WARNING"|"ERROR", message:string, refIds?:string[]}[]

  constructor(references: Referencable<string>[]) {
    for (let ref of references) {
      const {id, type} = ref
      if (id in this.refsById) {
        const {type:existingType} = this.refsById[id]
        const isReallyBad = existingType !== type? "ERROR" : "WARNING"
        this.pushMessage(isReallyBad, `Duplicate ref ids found. types ${type}, ${existingType}`, [id])
      }
      else {
        this.refsById[id] = ref
        if (!(type in this.refsByType)) {
          this.refsByType[type] = []
        }
        this.refsByType[type].push(ref)
      }
    }
  }

  pushMessage(level:"WARNING"|"ERROR", message:string, refIds?:string[]):void {
    this.messages.push({level,message,refIds})
  }

  pushWarning(message:string, refIds?:string[]):void {
    this.pushMessage("WARNING", message, refIds)
  }

  pushError(message:string, refIds?:string[]):void {
    this.pushMessage("ERROR", message, refIds)
  }

  getRefs<M extends Referencable<string>>(type:M["type"]):M[] {
    return type in this.refsByType? this.refsByType[type] as M[] : []
  }

  getRef<M extends Referencable<T>, T extends string = string>(id:string):M|undefined {
    return this.refsById[id] as M|undefined
  }

  serialize():string {
    // TODO - store duplicate values in error messages so stuff doesn't get lost
    return JSON.stringify({
      fridgely_version: CURRENT_VERSION,
      references: Object.values(this.refsById)
    }, null, 2)
  }

  static deserialize(serialized:string):FridgeState {
    let result
    try {
      result = JSON.parse(serialized) as SerializedFridgeState
    }
    catch (e) {
      const state = new FridgeState([])
      const msg = `Error parsing FridgeState string: ${e.message}\n${e.stack}`
      console.error(`[FridgeState].deserialize] ${msg}`)
      console.error(e)
      state.pushError(msg)
      state.pushError(serialized)
    }
    const {version, references} = result
    if (version !== CURRENT_VERSION) {
      const state = new FridgeState([])
      const msg = `Unuspported version number in serialized FridgeState. Supported:${CURRENT_VERSION} Found:${version}`
      console.error(`[FridgeState].deserialize] ${msg}`)
      state.pushError(msg)
      state.pushError(serialized)
    }
    return new FridgeState(references)
  }
}
