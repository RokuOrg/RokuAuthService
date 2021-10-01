export class Message {
    succes: boolean ;
    object: object;

    public constructor(_succes :boolean,_object :object) {
        this.succes = _succes
        this.object = _object
    }

}