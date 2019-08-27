import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

interface MailChimpResponse {
  result: string;
  msg: string;
}

@Component({
  selector: 'newsletter-signup',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  public submitted = false;
  public success: string;
  public mailChimpEndpoint = `https://infor.us18.list-manage.com/subscribe/post-json?u=50922b2a4dbfe95c954a9ebd6&id=6ed131db92&`;
  public error = '';

  public mailChimpForm = new FormGroup({
    emailControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    firstNameControl: new FormControl('', [
      Validators.required
    ]),
    lastNameControl: new FormControl(''),
    productControl: new FormControl(''),
    customerControl: new FormControl(''),
    productManagerControl: new FormControl(''),
    developerControl: new FormControl(''),
    productOwnerControl: new FormControl(''),
    businessAnalystControl: new FormControl(''),
    designerControl: new FormControl(''),
    projectManagerControl: new FormControl(''),
    otherControl: new FormControl('')
  });

  constructor(private http: HttpClient) { }

  ngOnInit() {}

  get emailControl(): any {
    return this.mailChimpForm.get('emailControl');
  }

  get firstNameControl(): any {
    return this.mailChimpForm.get('firstNameControl');
  }

  submit() {
    this.error = '';

    if (this.mailChimpForm.status === 'VALID') {

      let params = new HttpParams()
        .set('FNAME', this.mailChimpForm.controls.firstNameControl.value)
        .set('EMAIL', this.mailChimpForm.controls.emailControl.value)
        .set('LNAME', this.mailChimpForm.controls.lastNameControl.value)
        .set('PRODUCT', this.mailChimpForm.controls.productControl.value)
        .set('b_50922b2a4dbfe95c954a9ebd6_6ed131db92', ''); // hidden input name

      if (this.mailChimpForm.controls.customerControl.value !== '') {
        params = params.set('group[295][128]', this.mailChimpForm.controls.customerControl.value);
      }
      if (this.mailChimpForm.controls.productManagerControl.value !== '') {
        params = params.set('group[295][1]', this.mailChimpForm.controls.productManagerControl.value);
      }
      if (this.mailChimpForm.controls.developerControl.value !== '') {
        params = params.set('group[295][2]', this.mailChimpForm.controls.developerControl.value);
      }
      if (this.mailChimpForm.controls.productOwnerControl.value !== '') {
        params = params.set('group[295][4]', this.mailChimpForm.controls.productOwnerControl.value);
      }
      if (this.mailChimpForm.controls.businessAnalystControl.value !== '') {
        params = params.set('group[295][8]', this.mailChimpForm.controls.businessAnalystControl.value);
      }
      if (this.mailChimpForm.controls.designerControl.value !== '') {
        params = params.set('group[295][16]', this.mailChimpForm.controls.designerControl.value);
      }
      if (this.mailChimpForm.controls.projectManagerControl.value !== '') {
        params = params.set('group[295][32]', this.mailChimpForm.controls.projectManagerControl.value);
      }
      if (this.mailChimpForm.controls.otherControl.value !== '') {
        params = params.set('group[295][64]', this.mailChimpForm.controls.otherControl.value);
      }


      const mailChimpUrl = this.mailChimpEndpoint + params.toString();

      // 'c' refers to the jsonp callback param key. This is specific to Mailchimp
      this.http.jsonp<MailChimpResponse>(mailChimpUrl, 'c').subscribe(response => {
        console.log(response);
        if (response.result && response.result !== 'error') {
          this.submitted = true;
          this.success = response.msg;
          this.mailChimpForm.reset();
        } else {
          this.error = response.msg;
        }
      }, error => {
        console.error(error);
        this.error = 'Sorry, an error occurred.';
      });
    }
  }

}
