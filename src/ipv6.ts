export class IPadress {
  public Tagok: string[];
  public Ssz: number;
  private sorszam_seged: number = 0;

  public constructor(m: string[]) {
    this.Tagok = new Array(8);
    for (let i = 0; i < m.length; i++) {
      this.Tagok[i] = m[i];
    }
    this.Ssz = ++this.sorszam_seged;
  }

  public get EredetiCim(): string {
    return this.Tagok.join(":");
  }

  public get NullakSzama(): number {
    let sum = 0;
    for (let index = 0; index < this.EredetiCim.length; index++) {
      if (this.EredetiCim[index] == "0") sum++;
    }
    return sum;
  }

  public get VezetoNullakNelkul(): string {
    let input: string = this.EredetiCim;
    while (input.search(":0") != -1) {
      input = input.replace(":0", ":");
    }
    while (input.search("::") != -1) {
      input = input.replace("::", ":0:");
    }
    return input;
  }

  public get NagyonRovid(): string {
    let mitKeres = ":0:0:0:0:0:0:0";
    while (mitKeres.length > 2) {
      let index = this.VezetoNullakNelkul.indexOf(mitKeres);
      if (index > 0)
        return (
          this.VezetoNullakNelkul.substring(0, index + 1) +
          this.VezetoNullakNelkul.substring(index + mitKeres.length)
        );
      else mitKeres = mitKeres.substring(0, mitKeres.length - 2);
    }
    return "Nem rövidíthető tovább.";
  }

  public get Fajta(): string {
    if (this.Tagok[0] == "2001" && this.Tagok[1] == "0db8")
      return "Dokumentációs";
    if (this.Tagok[0] == "2001" && this.Tagok[1].startsWith("0e"))
      return "Globális";
    if (this.Tagok[0].startsWith("fc") || this.Tagok[0].startsWith("fd"))
      return "Helyi";
    return "Ismeretlen";
  }
}
