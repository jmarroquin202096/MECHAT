export class Chat {
  constructor(
    public _id: String,
    public IdDoc : String,
    public IdPac : String,
    public Mensajes : [{
      emisor : String,
      mensaje : String}
    ]
  ){}
  }
