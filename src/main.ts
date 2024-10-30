import { Component, importProvidersFrom, OnInit, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Aura } from 'primeng/themes/aura';
import { PrimeNGConfig } from 'primeng/api';

interface AutoCompleteCompleteEvent {
	originalEvent: Event;
	query: string;
}

interface Country {
	name: string;
	code: string;
}

@Component({
	selector: 'app-root',
	standalone: true,
	template: `
		<main>
			<h1>PrimeNg V18 Autocomplete Demo</h1>
			<hr />
			<div class="card flex justify-center">
				<p-autocomplete
					#autoComplete
					[autofocus]="true"
					[dropdown]="true"
					[showClear]="true"
					[autoHighlight]="true"
					[autoOptionFocus]="true"
					[variant]="'filled'"
					[(ngModel)]="selectedCountry"
					[suggestions]="filteredCountries"
					(completeMethod)="filterCountry($event)"
					(onFocus)="!autoComplete.value && autoComplete.handleDropdownClick($event)"
					(onSelect)="autoComplete.handleDropdownClick($event)"
					optionLabel="name" />
			</div>
		</main>
	`,
	imports: [InputTextModule, FormsModule, AutoCompleteModule],
})
export class App implements OnInit {
	countries = signal<Country[]>([]);
	selectedCountry: Country | undefined;
	filteredCountries: Country[] | undefined;

	constructor(private config: PrimeNGConfig) {
		this.config.theme.set({ preset: Aura });
	}

	ngOnInit() {
		this.countries.set([
			{ name: 'Australia', code: 'AU' },
			{ name: 'Brazil', code: 'BR' },
			{ name: 'China', code: 'CN' },
			{ name: 'France', code: 'FR' },
			{ name: 'Germany', code: 'DE' },
			{ name: 'India', code: 'IN' },
			{ name: 'Italy', code: 'IT' },
			{ name: 'Japan', code: 'JP' },
			{ name: 'Russia', code: 'RU' },
			{ name: 'Spain', code: 'ES' },
			{ name: 'United States', code: 'US' },
		]);
	}

	filterCountry(event: AutoCompleteCompleteEvent) {
		let filtered: any[] = [];
		let query = event.query;

		for (let i = 0; i < this.countries().length; i++) {
			let country = this.countries()[i];
			if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(country);
			}
		}
		this.filteredCountries = filtered;
	}
}

bootstrapApplication(App, {
	providers: [
		provideExperimentalZonelessChangeDetection(),
		importProvidersFrom(BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule),
	],
}).catch((err) => {
	console.error('Unable to Boostrap the application. Error:' + err);
});
