export class Faculty {
    nameUniversity: string;
    nameFaculty: string;
    decanFullName: string;
    phoneNumber: number;
    adress: string;

    constructor(nU: string, nF: string, dFN: string, pN: number, a: string) {
        this.nameUniversity = nU;
        this.nameFaculty = nF; 
        this.decanFullName = dFN;
        this.phoneNumber = pN;
        this.adress = a;
    }
}