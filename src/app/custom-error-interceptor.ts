import { ErrorHandler, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    constructor(private snackBar: MatSnackBar) {}
  
    handleError(error: any) {
      this.snackBar.open(error.message, 'Dismiss', {
        duration: 2000
      });
    }
  }
