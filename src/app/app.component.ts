import { Component, OnInit } from '@angular/core';

import { Car } from './car';
import { CarService } from './car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cars';
  cars: Car = new Car('', 0);
  error = '';
  success = '';
  car:any = new Car('', 0);

  constructor(private carService: CarService) {

  }

  ngOnInit() {
    this.getCars();
  }

  getCars(): void {
    this.carService.getAll().subscribe(
      (res: Car[]) => {
        this.cars = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  addCar(f: { reset: () => void; }) {
    this.error = '';
    this.success = '';

    this.carService.store(this.car)
      .subscribe(
        (res: Car[]) => {
          // Update the list of cars
          this.cars = res;

          // Inform the user
          this.success = 'Created successfully';

          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );
  }

  updateCar(name, price, id) {
    this.success = '';
    this.error = '';

    this.carService.update({ model: name.value, price: price.value, id: +id })
      .subscribe(
        (res) => {
          this.cars = res;
          this.success = 'Updated successfully';
        },
        (err) => this.error = err
      );
  }

  deleteCar(id: String | number) {
    this.success = '';
    this.error = '';

    this.carService.delete(+id)
      .subscribe(
        (res: Car[]) => {
          this.cars = res;
          this.success = 'Deleted successfully';
        },
        (err) => this.error = err
      );
  }
}