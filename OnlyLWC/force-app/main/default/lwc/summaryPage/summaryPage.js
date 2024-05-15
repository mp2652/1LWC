import { LightningElement, api } from 'lwc';
import createContact from '@salesforce/apex/ContactController.createContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class summaryPage extends LightningElement {
    @api firstName;
    @api lastName;
    @api dateOfBirth;
    @api country;
    @api phoneNumber;

    handlePrevious() {
        const event = new CustomEvent('stepprevious');
        this.dispatchEvent(event);
    }

    handleSubmit() {
        createContact({ 
            firstName: this.firstName, 
            lastName: this.lastName, 
            birthdate: this.dateOfBirth, 
            phone: this.phoneNumber, 
            country: this.country 
        })
        .then(result => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact created',
                    variant: 'success'
                })
            );
            this.dispatchEvent(new CustomEvent('stepcomplete'));
            this.dispatchEvent(new CustomEvent('finish'));
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating contact',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
}
