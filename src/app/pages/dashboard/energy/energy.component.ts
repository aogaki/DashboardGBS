import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClientService } from "../../../services/http-client.service";
import { NbThemeService } from "@nebular/theme";

declare var JSROOT: any;

interface MessageInfo {
  id: string;
  mean: string;
  fwhm: string;
  imagePath: string;
  time: string;
}

interface EneSummary {
  title: string;
  value: string;
}

@Component({
  selector: "ngx-energy",
  templateUrl: "./energy.component.html",
  styleUrls: ["./energy.component.scss"]
})
export class EnergyComponent implements OnInit, OnDestroy {
  public messageInfoList: MessageInfo[] = [];
  public eneSumList: EneSummary[] = [];

  currentTheme: string;
  themeSubscription: any;

  constructor(
    private httpClientService: HttpClientService,
    private themeService: NbThemeService
  ) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });

    this.httpClientService
      .getEnergy()
      .then(response => {
        this.messageInfoList = response;
        // MongoDB C++ driver do not allow to use $pair as a key of JSON.
        // But, ROOT uses such key to create JSON object from histogram.
        // When I uploading, I replace $ -> aogaki_.
        // When downloading, I have to replace aogaki_ -> $.  Stupid me :-<
        const result = this.messageInfoList["fit"].replace(/aogaki_/g, "$");
        const obj = JSROOT.parse(result);
        JSROOT.draw("histDrawing", obj, "hist");

        const date = new Date(Number(this.messageInfoList["time"]) * 1000);
        let year = date.getFullYear();

        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const hour = date.getHours();
        const min = date.getMinutes();

        const ene = Number(this.messageInfoList["mean"]);
        const fwhm = Number(this.messageInfoList["fwhm"]);

        // this.eneSumList.length = 0;
        this.eneSumList.push({
          title: "Time, Date",
          // value: hour + ':' + min + '\t' + day + '.' + month + '.' + year
          value: hour + ":" + min + ",\t" + day + "." + month
        });
        this.eneSumList.push({
          title: "Energy",
          value: ene.toFixed(3) + " MeV"
        });
        this.eneSumList.push({
          title: "FWHM",
          value: fwhm.toFixed(3) + " MeV"
        });
      })
      .catch(error => console.log(error));
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
