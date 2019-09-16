import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AdminApiService } from '../../service/admin-api.service';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  isLoading: Boolean = true;
  customersbyyear = [];
  customersbygender = [];
  allcustomers: Subscription;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptionsByYear = {};
  chartOptionsByGender = {};
  databyyear = [
    {id: 1 , name: 'Jan', count: 0},
    {id: 2 , name: 'Feb', count: 0},
    {id: 3 , name: 'Mar', count: 0},
    {id: 4 , name: 'Apr', count: 0},
    {id: 5 , name: 'May', count: 0},
    {id: 6 , name: 'Jun', count: 0},
    {id: 7 , name: 'Jul', count: 0},
    {id: 8 , name: 'Aug', count: 0},
    {id: 9 , name: 'Sep', count: 0},
    {id: 10 , name: 'Oct', count: 0},
    {id: 11 , name: 'Nov', count: 0},
    {id: 12 , name: 'Dec', count: 0}
  ];
  monthListsbyyear = [];
  countCustomersbyyear = [];
  databygender: any;

constructor(
  private apiService: AdminApiService,
  private route: Router
) { }

ngOnInit() {
  // this.getCustomerListsByYear();
  // this.getCustomerListsByGender();
  this.getCustomerLists();
}

getCustomerLists() {
  const allcustomersbyyear = this.apiService.getCustomers();
  const allcustomersbygender = this.apiService.getCustomersByGender();
  this.allcustomers = forkJoin([allcustomersbyyear, allcustomersbygender]).subscribe(results => {
        console.log(results[0]);
        console.log(results[1]);

        this.customersbyyear = results[0].custlists;
        this.customersbyyear.forEach(element => {
          this.databyyear.map((obj => {
            if (obj.id === element._id.month) {
              obj.count = element.count;
            }
          }));
        });
        this.databyyear.forEach(element => {
          this.monthListsbyyear.push(element.name);
          this.countCustomersbyyear.push(element.count);
        });
        this.registrationChart(this.monthListsbyyear, this.countCustomersbyyear);

        this.customersbygender = results[1].custlistsgen[0];
        delete this.customersbygender['_id'];
        this.databygender = Object.keys(this.customersbygender).map(key => {
          return [String(key), this.customersbygender[key]];
        });
        console.log(this.databygender);
        this.genderwiseChart(this.databygender);

        this.isLoading = false;

  });
}

registrationChart(monthLists, countCustomers) {
  this.chartOptionsByYear = {
    chart: {
      type: 'column',
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
            [0, '#2a2a2b'],
            [1, '#3e3e40']
        ]
      },
      style: {
          fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063'
    },
    colors: ['#90ee7e'],
    title: {
      text: 'Registrations in 2019',
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase',
        fontSize: '20px'
      }
    },
    subtitle: {
      text: 'Piyali Das',
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase'
      }
    },
    xAxis: {
      gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
            style: {
                color: '#A0A0A3'

            }
        },
      categories: monthLists,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Value (no.)',
        style: {
          color: '#A0A0A3'
        }
      },
      gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
            color: '#F0F0F0'
        }
    },
    legend: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
            color: '#E0E0E3'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#606063'
        },
        title: {
            style: {
                color: '#C0C0C0'
            }
        }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Customers',
      data: countCustomers
    }]
  };
}

genderwiseChart(databygender) {
  this.chartOptionsByGender = {
    chart : {
      renderTo: 'container',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
   },
   title : {
      text: 'Registration by Genderwise'
   },
   tooltip : {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
   },
   plotOptions : {
      pie: {
         allowPointSelect: true,
         cursor: 'pointer',
         dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
               color: '#000000'
            }
         }
      }
   },
   series : [{
      type: 'pie',
      name: 'Browser share',
      data: databygender
  }]
};
}

ngOnDestroy() {
  this.allcustomers.unsubscribe();
}

}
