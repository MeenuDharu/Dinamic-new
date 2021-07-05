import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../_services/api.service';
import { Result } from '@zxing/library';

@Component({
	selector: 'app-feedback',
	templateUrl: './feedback.component.html',
	styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

	feedForm: any = {};
	constructor(private router: Router, private apiService: ApiService) { }

	ngOnInit() {

		this.apiService.GET_USER_FEEDBACK().subscribe(result => {
			if (result.status == 1) {
				this.feedForm.quality = result.feedback.feedback_list[0].value.toString();
				this.feedForm.service = result.feedback.feedback_list[1].value.toString();
				this.feedForm.pricing = result.feedback.feedback_list[2].value.toString();
			} else {
				this.feedForm.quality = "5";
				this.feedForm.service = "5";
				this.feedForm.pricing = "5";
			}
		})
	}

	onSubmit() {

		let feedback_list = {
			"feedback_list": [
				{ "name": "quality", "value": this.feedForm.quality },
				{ "name": "service", "value": this.feedForm.service },
				{ "name": "pricing", "value": this.feedForm.pricing }
			]
		}

		let feedback = {};
		feedback['feedback_details'] = feedback_list;

		console.log(feedback);
		// this.router.navigate(['/bill/confirm']);
		this.apiService.USER_FEEDBACK(feedback).subscribe(result => {

			if (result.status) {
				if (JSON.parse(localStorage.getItem('restaurant_details')).order_type == 'in_house') {
					this.router.navigate(['/bill/confirm']);
				} else {
					this.router.navigate(['/pickup']);
				}

			}
			else {
				console.log('response', result);
			}
		});

	}

	clickBack() {
		if (JSON.parse(localStorage.getItem('restaurant_details')).order_type == 'in_house') {
			this.router.navigate(['/bill/confirm']);
		} else {
			this.router.navigate(['/pickup']);
		}

	}

}
