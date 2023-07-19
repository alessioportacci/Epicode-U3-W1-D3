enum taxationIrpef
{
    IRPEF1 = 23, //Fino a 15.000
    IRPEF2 = 25, //Fino a 28.000
    IRPEF3 = 35, //Fino a 50.000
    IRPEF4 = 43  //Più di 50.000
}

enum taxationInps
{
    INPS1 = 24.48, //Commerciante
    INPS2 = 24,    //Artigiano/Agricoltore
    INPS3 = 26.23, //Senza cassa
    INPS4 = 33     //Senza partita IVA
}


abstract class AnnualIncome 
{
    pIva?:number
    codRedd:string
    redditoAnnuoLordo:number
    tasseInps:number
    tasseIrpef:number
    //Costruttore
    constructor() 
    {
        this.pIva = 0
        this.codRedd = "a"
        this.redditoAnnuoLordo = 0
        this.tasseInps = 0
        this.tasseIrpef = 0
    }
    //Getters
    getUtileTasse():number        { return 0          }
    getTasseInps():number         { return this.tasseInps         }
    getTasseIrpef():number        { return this.tasseIrpef        }
    getRedditoAnnuoNetto():number { return this.redditoAnnuoLordo }
}

class Stipendio extends AnnualIncome
{
    constructor(codRedd:string, redditoAnnuoLordo:number, pIva:number = 4)
    {
        //#region Variabili passate
        super()
        this.pIva = pIva
        this.codRedd = codRedd
        this.redditoAnnuoLordo = redditoAnnuoLordo
        //#endregion

        //#region IRPEF
        if(redditoAnnuoLordo < 15001)
            this.tasseIrpef = taxationIrpef.IRPEF1
        else if(redditoAnnuoLordo < 28001)
            this.tasseIrpef = taxationIrpef.IRPEF2
        else if(redditoAnnuoLordo < 50001)
            this.tasseIrpef = taxationIrpef.IRPEF3
        else 
            this.tasseIrpef = taxationIrpef.IRPEF4
        //#endregion
        
        //#region Inps
        switch(pIva)
        {
            case(1):
                this.tasseInps = taxationInps.INPS1
                break
            case(2):
                this.tasseInps = taxationInps.INPS2
                break            
            case(3):
                this.tasseInps = taxationInps.INPS3
                break
            case(4): //Senza PIVA
                this.tasseInps = taxationInps.INPS4
                break
        }
        //#endregion
    }

    getUtileTasse(): number 
    {  
        //IRES(24%) + IRAP(5%)
        return ((this.redditoAnnuoLordo/100) * 24) + ((this.redditoAnnuoLordo/100) * 3.5)
    }

    getTasseInps(): number 
    {
        return this.tasseInps
    }

    getTasseIrpef(): number 
    {
        return this.tasseIrpef 
    }

    getRedditoAnnuoNetto(): number 
    {
        let redditoNetto:number = this.redditoAnnuoLordo
        //Rimuovo Inps
        redditoNetto -= ((this.redditoAnnuoLordo /100) * this.tasseInps)
        redditoNetto -= ((this.redditoAnnuoLordo /100) * this.tasseIrpef)
        return redditoNetto
    }
}


const PeppinoCalzolaio = new Stipendio("123456", 16000)
let peppinoUtileTasse = PeppinoCalzolaio.getUtileTasse()
let peppinoInps = PeppinoCalzolaio.getTasseInps()
let peppinoIrpef = PeppinoCalzolaio.getTasseIrpef()
let peppinoReddito = PeppinoCalzolaio.getRedditoAnnuoNetto()

console.log(PeppinoCalzolaio.getRedditoAnnuoNetto())