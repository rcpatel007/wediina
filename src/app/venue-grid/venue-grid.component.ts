import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-venue-grid',
  templateUrl: './venue-grid.component.html',
  styleUrls: ['./venue-grid.component.css']
})
export class VenueGridComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function () {
      $('#datetimepicker12').datetimepicker({
          inline: true,
          sideBySide: true
      });
  });
  }

}
