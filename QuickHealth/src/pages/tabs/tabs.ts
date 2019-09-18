import { Component } from '@angular/core';

import { Tab1, Tab2 } from '../hopitaux/hopitaux';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Tab1;
  tab2Root = Tab2;

  constructor() {

  }
}