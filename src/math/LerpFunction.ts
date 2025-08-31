export default interface LerpFunction<LerpType>{
    
    (t : number, a : LerpType, b : LerpType) : LerpType;
}
