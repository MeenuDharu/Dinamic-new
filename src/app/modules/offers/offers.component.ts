import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { Socket } from 'ngx-socket-io';

@Component({
	selector: 'app-offers',
	templateUrl: './offers.component.html',
	styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

	offers_list: any = [];

	constructor(private apiService: ApiService, private socket: Socket) { }

	ngOnInit() {

		// let dummy = {
		//   "vehicle_details" : {
		//     "_id" : "5e39529742d7b61bdd99bf64",
		//     "branch_id": "5befbfac2b814422a23360ab",
		//     "valet_id" : "valet_3",
		//     "serial_number" : "000004",
		//     "action": "re_request",
		//     "requested_delay": 2,
		//     "delivery_time": "Tue Feb 04 2020 16:24:26 GMT+0530 (India Standard Time)",
		//     "user_details": {
		//       "name": "user4",
		//         "contact_number": "4444",
		//       "email": "u4@email.com"
		//     }
		//   }
		// }

		// this.socket.emit('update_valet', dummy);

		this.apiService.GET_OFFERS().subscribe(result => {
			console.log("offers.........", result);
			if (result.status) {
				this.offers_list = result.offers;
			}
		})
	}

}
