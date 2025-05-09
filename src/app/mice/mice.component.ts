import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MICE, Mouse } from '../../assets/data/mice';
import { DecimalPipe, NgClass, NgOptimizedImage } from '@angular/common';
import { DataView } from 'primeng/dataview';
import { Button } from 'primeng/button';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import {
    BRANDS,
    COLORS,
    COLORS_NAMES,
    FEATURES,
    KEY_SWITCH,
    LINES,
    OS_TYPES,
    SOFTWARE
} from '../../assets/data/utility';
import { Tooltip } from 'primeng/tooltip';
import { Slider } from 'primeng/slider';
import { debounceTime } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-mice',
    imports: [
        DataView,
        Button,
        NgClass,
        NgOptimizedImage,
        DecimalPipe,
        ReactiveFormsModule,
        Checkbox,
        Tooltip,
        Slider,
        Select,
        FormsModule
    ],
  templateUrl: './mice.component.html',
  styleUrl: './mice.component.sass'
})
export class MiceComponent implements OnInit {
    private readonly fb = inject(FormBuilder);
    readonly mice  = MICE;
    readonly brands: string[] = Object.values(BRANDS);
    readonly productLines: string[] = Object.values(LINES);
    readonly osTypes = Object.values(OS_TYPES);
    readonly colors = Object.values(COLORS);
    readonly features = Object.values(FEATURES);
    readonly software = Object.values(SOFTWARE);
    readonly keySwitch = Object.values(KEY_SWITCH);
    readonly colorNames = COLORS_NAMES;
    readonly numOfButtons = this.mice.map(mouse => mouse.buttonCount)
        .reduce((a, b) => Math.max(a, b));
    readonly numOfButtonsAsString: string[] = [];
    readonly maxPrice = Math.ceil(this.mice.map(mouse => mouse.price)
        .reduce((a, b) => Math.max(a, b)));
    readonly maxDPI = this.mice.map(mouse => mouse.dpi)
        .reduce((a, b) => Math.max(a, b));
    readonly maxPollingRate = this.mice.filter(mouse => !!mouse.pollingRate)
        .map(mouse => mouse.pollingRate as number)
        .reduce((a, b) => Math.max(a, b));
    readonly maxWeight = this.mice.map(mouse => mouse.weight)
        .reduce((a, b) => Math.max(a, b));
    sortOptions!: SelectItem[];
    sortOrder!: number;
    sortField!: string;
    filteredMice: WritableSignal<Mouse[]> = signal(this.mice);
    filterForm!: FormGroup;

    get brandsCheckboxes(): FormArray {
        return this.filterForm.get('brands') as FormArray;
    }

    get linesCheckboxes(): FormArray {
        return this.filterForm.get('lines') as FormArray;
    }

    get osTypesCheckboxes(): FormArray {
        return this.filterForm.get('osTypes') as FormArray;
    }

    get colorsArray(): FormArray {
        return this.filterForm.get('colors') as FormArray;
    }

    get buttonCountArray(): FormArray {
        return this.filterForm.get('buttonCount') as FormArray;
    }

    get featuresCheckboxes(): FormArray {
        return this.filterForm.get('features') as FormArray;
    }

    get softwareCheckboxes(): FormArray {
        return this.filterForm.get('software') as FormArray;
    }

    get keySwitchCheckboxes(): FormArray {
        return this.filterForm.get('keySwitch') as FormArray;
    }

    ngOnInit(): void {
        this.sortOptions = [
            { label: 'Price High to Low', value: '!price'},
            { label: 'Price Low to High', value: 'price'},
            { label: 'Name A-Z', value: 'name'},
            { label: 'Name Z-A', value: '!name'},
            { label: 'Brand A-Z', value: 'brand'},
            { label: 'Brand Z-A', value: '!brand'},
        ];
        this.fillNumOfButtonsString();
        this.initForm();
        this.filterForm.valueChanges.pipe(debounceTime(100)).subscribe(changes => {
            console.log(changes);
            const selectedBrands = this.brands.filter((brand, index) => this.brandsCheckboxes.at(index)?.value);
            const selectedLines = this.productLines.filter((brand, index) => this.linesCheckboxes.at(index)?.value);
            const selectedOsTypes = this.osTypes.filter((brand, index) => this.osTypesCheckboxes.at(index)?.value);
            const selectedFeatures = this.features.filter((brand, index) => this.featuresCheckboxes.at(index)?.value);
            const selectedSoftware = this.software.filter((brand, index) => this.softwareCheckboxes.at(index)?.value);
            const selectedKeySwitches = this.keySwitch.filter((brand, index) => this.keySwitchCheckboxes.at(index)?.value);

            const filtered = this.mice
                .filter(mouse => !selectedBrands.length || selectedBrands.includes(mouse.brand))
                .filter(mouse => !selectedLines.length || selectedLines.includes(mouse.line || ''))
                .filter(mouse => (changes.usb && !!mouse.usbVersion) || !changes.usb)
                .filter(mouse => (changes.bluetooth && mouse.bluetoothVersion) || !changes.bluetooth)
                .filter(mouse => (changes.rf && mouse.radioFrequency) || !changes.rf)
                .filter(mouse => (!changes.lightingYes && !changes.lightingNo) ||
                    (changes.lightingYes && mouse.lighting) ||
                    (changes.lightingNo && !mouse.lighting))
                .filter(mouse => (!changes.ambidextrous && !changes.rightHanded && !changes.leftHanded) ||
                    (changes.ambidextrous && mouse.rightHanded && mouse.leftHanded) ||
                    (changes.rightHanded && mouse.rightHanded) ||
                    (changes.leftHanded && mouse.leftHanded))
                .filter(mouse => !selectedOsTypes.length ||
                    !!selectedOsTypes.filter(type => mouse.osTypes?.includes(type)).length)
                .filter(mouse => !changes.colors.length ||
                    !!this.colorsArray.value.filter((color: COLORS) => mouse.colors?.includes(color)).length)
                .filter(mouse => !changes.buttonCount.length || changes.buttonCount.includes(mouse.buttonCount.toString()))
                .filter(mouse => !selectedFeatures.length ||
                    !!selectedFeatures.filter(feature => mouse.features.includes(feature)).length)
                .filter(mouse => !selectedSoftware.length
                    || !!selectedSoftware.filter(sw => mouse.software === sw).length)
                .filter(mouse => mouse.price >= changes.price[0] && mouse.price <= changes.price[1])
                .filter(mouse => !selectedKeySwitches.length || selectedKeySwitches.includes(mouse.keySwitch ?? '' as KEY_SWITCH))
                .filter(mouse => mouse.dpi >= changes.dpi[0] && mouse.dpi <= changes.dpi[1])
                .filter(mouse => (mouse.pollingRate ?? 0) >= changes.pollingRate[0] && (mouse.pollingRate ?? 0) <= changes.pollingRate[1])
                .filter(mouse => mouse.weight >= changes.weight[0] && mouse.weight <= changes.weight[1]);

            this.filteredMice.set(filtered);
        });
    }

    selectColor(e: MouseEvent, color: string) {
        (e.srcElement as HTMLElement)?.classList.toggle('surface-border');
        (e.srcElement as HTMLElement)?.classList.toggle('border-3');
        (e.srcElement as HTMLElement)?.classList.toggle('border-blue-400');

        const index = this.colorsArray.controls.findIndex(control => control.value === color);
        if (index > -1) {
            this.colorsArray.removeAt(index);
        } else {
            this.colorsArray.push(this.fb.control(color));
        }
    }

    selectNumOfButtons(e: MouseEvent, num: string) {
        (e.srcElement as HTMLElement)?.classList.toggle('surface-border');
        (e.srcElement as HTMLElement)?.classList.toggle('bg-primary');

        const index = this.buttonCountArray.controls.findIndex(control => control.value === num);
        if (index > -1) {
            this.buttonCountArray.removeAt(index);
        } else {
            this.buttonCountArray.push(this.fb.control(num));
        }
    }

    onSortChange(event: any) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    private fillNumOfButtonsString() {
        this.numOfButtonsAsString.length = 0;
        for (let i = 1; i <= this.numOfButtons; i++) {
            this.numOfButtonsAsString.push(i.toString());
        }
    }

    private initForm() {
        this.filterForm = this.fb.group({
            brands: this.fb.array(this.brands.map(_ => this.fb.control(false))),
            lines: this.fb.array(this.productLines.map(_ => this.fb.control(false))),
            osTypes: this.fb.array(this.osTypes.map(_ => this.fb.control(false))),
            features: this.fb.array(this.features.map(_ => this.fb.control(false))),
            software: this.fb.array(this.software.map(_ => this.fb.control(false))),
            usb: this.fb.control(false),
            bluetooth: this.fb.control(false),
            rf: this.fb.control(false),
            lightingYes: this.fb.control(false),
            lightingNo: this.fb.control(false),
            ambidextrous: this.fb.control(false),
            rightHanded: this.fb.control(false),
            leftHanded: this.fb.control(false),
            colors: this.fb.array([]),
            buttonCount: this.fb.array([]),
            price: this.fb.control([0, this.maxPrice]),
            dpi: this.fb.control([0, this.maxDPI]),
            pollingRate: this.fb.control([0, this.maxPollingRate]),
            weight: this.fb.control([0, this.maxWeight]),
            keySwitch: this.fb.array(this.keySwitch.map(_ => this.fb.control(false)))
        });
    }

}
