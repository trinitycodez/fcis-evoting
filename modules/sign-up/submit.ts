type hold = {
    matric: string,
    image: string,
    password: string,
    message?: string
}
export class Submit {
    public sms!: hold;
    
    constructor(public matric: string, public image: string, private _password: string, ) {}

    async send () {
        const data = {
            matric: this.matric, 
            image: this.image,
            password: this._password,
        }
        this.sms = await fetch("/auth/sign-in/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then((res) =>
            res.json()
        )
        .then((res) => {
            return res
        })
        .catch((e: Error) => { 
            return e.message;
        })
    }
}
