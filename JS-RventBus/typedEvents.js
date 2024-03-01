
/** 
 * Typed Events {EventName: string, RequiredPayload: any} 
 * 
 * The named properties in this object are used to **_type_** event payloads.    
 * 
 * The payload values below are simply _placeholders_ and are used to     
 * extract the _value-types_ required for each named event.    
 * 
 * A DieTouched event requires an object payload with a    
 * single numeric property named index.
 */
export let TypedEvents = {
   /** payload: die number */
   DieTouched: { index: 0 },
   /** payload: roll number */
   RollButtonTouched: 0,
   /** payload: ScoreButton index */
   ScoreButtonTouched: 0,
   /** payload: Object - index number, die value, is-frozen */
   UpdateDie: {
      index: 0,
      value: 0,
      frozen: true
   }
}