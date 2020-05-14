import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Car } from './domain/car';
import { CarService } from './services/carservice';

export class PrimeCar implements Car {
    constructor(public vin?, public year?, public brand?, public color?) {}
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [CarService]
})
export class AppComponent implements OnInit {

    displayDialog: boolean;

    car: Car = new PrimeCar();

    selectedCar: Car;

    newCar: boolean;

    cars: Car[];

    cols: any[];
    
    @ViewChild('btnUpdate') myDiv: ElementRef;

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
    }

    showDialogToAdd() {
        this.newCar = true;
        this.car = new PrimeCar();
        this.displayDialog = true;
    }

    save() {
        const cars = [...this.cars];
        if (this.newCar) {
            cars.push(this.car);
        } else {
            cars[this.findSelectedCarIndex()] = this.car;
        }
        this.cars = cars;
        this.car = null;
        this.displayDialog = false;
    }

    delete() {
        const index = this.findSelectedCarIndex();
        this.cars = this.cars.filter((val, i) => i !== index);
        this.car = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        //~ this.newCar = false;
        //~ this.car = {...event.data};
        //~ this.displayDialog = true;
    }

    findSelectedCarIndex(): number {
        return this.cars.indexOf(this.selectedCar);
    }
    
    onUpdateButtonClick(btn){
		const index = btn[0].parentElement.parentElement.rowIndex - 1;
        console.log(btn[0].parentNode.parentNode.rowIndex);
        //~ this.cars = this.cars.filter((val, i) => i !== index);
        //~ this.car = null;

        
        //~ alert(rowIndex);
	}
	

  showPropNameEditCellTextBox(col) {
    return true; //~ (col.field === 'vin' || (col.field === 'year') || (col.field === 'brand') || (col.field === 'color'));
  }

  showPropValueTypeEditDdl(col) {
    return (col.field === 'propValueType');
  }

  showPropValueTxtIfString(rowData, col) {
    return (col.field === 'propValue' && rowData.propValueType === 'String');
  }

  showPropValueDdlIfBoolean(rowData, col) {
    return (col.field === 'propValue' && rowData.propValueType === 'Boolean');
  }

}
