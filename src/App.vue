<template>
  <div id="app">
    <p>
      Linkek: <a href="ip.txt" download>ip.txt   </a>
      <a href="e_inf_14maj_ut_correct.pdf" target="_blank">Feladat   </a>
      <a href="e_inf_14maj_fl_correct.pdf" target="_blank">Javítási  </a>
      <a href="https://github.com/Jabezare/ErettsegiIPv6" target="_blank">Forrás </a>
      <a href="https://github.com/nitslaszlo/JedlikVueJsStarter" target="_blank">SDK</a>
    </p>
    <txt-olvaso v-on:load="forras = $event" title="Kérem töltse fel a forrás (ip.txt) állományt!" />
    <div id="megoldas" v-if="mutat">
      <p>1. feladat:<br>Az adatok beolvasása</p>
      <p>2. feladat:<br>A fájlban {{ipcimek.length}} bejegyzés van.</p>
      <p>3. feladat:<br>A legalacsonyabb tárolt Ip-cím: {{Legalacsonyabb}}</p>
      <p>4. feladat:<br>Dokumentációs:{{Tipusok[0]}}<br>Globális:{{Tipusok[1]}}<br>Helyi:{{Tipusok[2]}}<br>Ismeretlen:{{Tipusok[3]}}</p>
      <label for="Hatodik_feladat">Kérek egy sorszámot:</label>
      <input type="text" name="Hatodik_feladat" v-model="bekeres">
      <pre>6. feladat:<br>{{Nullaknelkul}}</pre>
      <p>7. feladat:<br>A kiválasztott Ip-cím nagyon röviden:{{Rovid}}</p>
      <span v-for="(index, item) in SokToTxt" :key="index">{{item}}<br></span>
    </div>
    <!-- Nem a feladat része : -->
      <p v-show="mutat"><b>ip.txt fájl:</b></p>
      <span v-for="(t, index) in forras.split('\n')" :key="index">{{t.trim()}}<br></span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { IPadress } from "./ipv6";
import TxtOlvaso from "./components/TxtOlvaso.vue";

// eslint-disable-next-line
@Component({ components: { TxtOlvaso } })
export default class App extends Vue {
  private ipcimek: IPadress[] = [];
  private forras: string = "";
  private mutat: boolean = false;
  public bekeres: number = 1;

  @Watch("forras", { immediate: true, deep: true })
  onForrasChanged(val: string, oldVal: string) {
    if (val != "") {
      this.Feldolgoz();
    }
  }

  private Feldolgoz(): void {
    try {
      this.forras.split("\n").forEach(i => {
        const aktSor: string = i.trim();
        let aktCim: string[] = aktSor.split(":");
        this.ipcimek.push(new IPadress(aktCim));
      });
      this.mutat = true;
    } catch (error) {
      this.mutat = false;
      this.ipcimek = [];
      this.forras = "";
      window.alert("Hibás forrás!");
    }
  }

  // 3. feladat
  private get Legalacsonyabb(): string {
    return this.ipcimek.sort()[0].EredetiCim;
  }

  //4. feladat
  private get Tipusok(): number[] {
    let darab: number[] = [0, 0, 0, 0];
    this.ipcimek.forEach(i => {
      switch (i.Fajta) {
        case "Dokumentációs":
          darab[0]++;
          break;
        case "Globális":
          darab[1]++;
          break;
        case "Helyi":
          darab[2]++;
          break;
        case "Ismeretlen":
          darab[3]++;
          break;
      }
    });
    return darab;
  }

  //5.feladat
  private get SokToTxt(): string[] {
    let ki: string[] = [];
    this.ipcimek.forEach(i => {
      if (i.NullakSzama >= 18) {
        ki.push(i.Ssz + " " + i.EredetiCim);
      }
    });
    return ki;
  }

  //6. feladat
  private get Nullaknelkul(): string {
    return (
      this.ipcimek[this.bekeres - 1].EredetiCim +
      "\n" +
      this.ipcimek[this.bekeres - 1].VezetoNullakNelkul
    );
  }

  //7. feladat
  private get Rovid(): string {
    return this.ipcimek[this.bekeres - 1].NagyonRovid;
  }
}
</script>

<style>
#app {
  font-family: Courier;
}
#megoldas {
  background-color: lightgrey;
}
a {
  text-decoration: none;
}
</style>
