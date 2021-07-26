import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mainData: any;
  stateDate: any[];
  isDistrict:boolean;
  ELEMENT_DATA: any[];

  displayedColumns: string[] = ['state', 'confirmed', 'recovered', 'deaths'];
  dataSource = new MatTableDataSource(null);



  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.homeReload()
  }

  onClickState(element) {
    this.isDistrict =true;
    this.mainData = element;
    this.displayedColumns = ['district', 'confirmed', 'recovered', 'deaths'];
    const state = element.state
    this.http.get('https://api.covid19india.org/state_district_wise.json').subscribe((data) => {
      var res = Object.keys(data[state]['districtData']).map((ele) => { 
        const eleVal = data[state]['districtData'][ele];
        eleVal['district']=ele;
        eleVal['deaths'] = eleVal['deceased'];
        delete eleVal['deceased']
        return eleVal
       })
      this.ELEMENT_DATA = res
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    })

  }

  homeReload(){
    this.isDistrict= false;
    this.displayedColumns = ['state', 'confirmed', 'recovered', 'deaths'];
    this.http.get('https://api.covid19india.org/data.json').subscribe((data) => {
      this.mainData = data['statewise'][0]
      this.ELEMENT_DATA = (data['statewise'].splice(1))
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    })
  }

}
