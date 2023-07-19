var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var taxationIrpef;
(function (taxationIrpef) {
    taxationIrpef[taxationIrpef["IRPEF1"] = 23] = "IRPEF1";
    taxationIrpef[taxationIrpef["IRPEF2"] = 25] = "IRPEF2";
    taxationIrpef[taxationIrpef["IRPEF3"] = 35] = "IRPEF3";
    taxationIrpef[taxationIrpef["IRPEF4"] = 43] = "IRPEF4"; //Più di 50.000
})(taxationIrpef || (taxationIrpef = {}));
var taxationInps;
(function (taxationInps) {
    taxationInps[taxationInps["INPS1"] = 24.48] = "INPS1";
    taxationInps[taxationInps["INPS2"] = 24] = "INPS2";
    taxationInps[taxationInps["INPS3"] = 26.23] = "INPS3";
    taxationInps[taxationInps["INPS4"] = 33] = "INPS4"; //Senza partita IVA
})(taxationInps || (taxationInps = {}));
var AnnualIncome = /** @class */ (function () {
    //Costruttore
    function AnnualIncome() {
        this.pIva = 0;
        this.codRedd = "a";
        this.redditoAnnuoLordo = 0;
        this.tasseInps = 0;
        this.tasseIrpef = 0;
    }
    //Getters
    AnnualIncome.prototype.getUtileTasse = function () { return 0; };
    AnnualIncome.prototype.getTasseInps = function () { return this.tasseInps; };
    AnnualIncome.prototype.getTasseIrpef = function () { return this.tasseIrpef; };
    AnnualIncome.prototype.getRedditoAnnuoNetto = function () { return this.redditoAnnuoLordo; };
    return AnnualIncome;
}());
var Stipendio = /** @class */ (function (_super) {
    __extends(Stipendio, _super);
    function Stipendio(codRedd, redditoAnnuoLordo, pIva) {
        if (pIva === void 0) { pIva = 4; }
        var _this = 
        //#region Variabili passate
        _super.call(this) || this;
        _this.pIva = pIva;
        _this.codRedd = codRedd;
        _this.redditoAnnuoLordo = redditoAnnuoLordo;
        //#endregion
        //#region IRPEF
        if (redditoAnnuoLordo < 15001)
            _this.tasseIrpef = taxationIrpef.IRPEF1;
        else if (redditoAnnuoLordo < 28001)
            _this.tasseIrpef = taxationIrpef.IRPEF2;
        else if (redditoAnnuoLordo < 50001)
            _this.tasseIrpef = taxationIrpef.IRPEF3;
        else
            _this.tasseIrpef = taxationIrpef.IRPEF4;
        //#endregion
        //#region Inps
        switch (pIva) {
            case (1):
                _this.tasseInps = taxationInps.INPS1;
                break;
            case (2):
                _this.tasseInps = taxationInps.INPS2;
                break;
            case (3):
                _this.tasseInps = taxationInps.INPS3;
                break;
            case (4): //Senza PIVA
                _this.tasseInps = taxationInps.INPS4;
                break;
        }
        return _this;
        //#endregion
    }
    Stipendio.prototype.getUtileTasse = function () {
        //IRES(24%) + IRAP(5%)
        return ((this.redditoAnnuoLordo / 100) * 24) + ((this.redditoAnnuoLordo / 100) * 3.5);
    };
    Stipendio.prototype.getTasseInps = function () {
        return this.tasseInps;
    };
    Stipendio.prototype.getTasseIrpef = function () {
        return this.tasseIrpef;
    };
    Stipendio.prototype.getRedditoAnnuoNetto = function () {
        var redditoNetto = this.redditoAnnuoLordo;
        //Rimuovo Inps
        redditoNetto -= ((this.redditoAnnuoLordo / 100) * this.tasseInps);
        redditoNetto -= ((this.redditoAnnuoLordo / 100) * this.tasseIrpef);
        return redditoNetto;
    };
    return Stipendio;
}(AnnualIncome));
var PeppinoCalzolaio = new Stipendio("123456", 16000);
var peppinoUtileTasse = PeppinoCalzolaio.getUtileTasse();
var peppinoInps = PeppinoCalzolaio.getTasseInps();
var peppinoIrpef = PeppinoCalzolaio.getTasseIrpef();
var peppinoReddito = PeppinoCalzolaio.getRedditoAnnuoNetto();
console.log(PeppinoCalzolaio.getRedditoAnnuoNetto());
