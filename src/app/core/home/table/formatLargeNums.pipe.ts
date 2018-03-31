import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
	name: 'formatLargeNums'
})
export class FormatLargeNums implements PipeTransform {
	transform(value: any) {
		if (value >= 1000000000000){  //1T
			value = value/1000000000000
			return Number(value).toFixed(2) + " Tr";
		}
		else if (value >= 1000000000){  //1B
			value = value/1000000000
			return Number(value).toFixed(2) + " B";
		}
		else if (value >= 1000000){  //1M
			value = value/1000000
			value.toFixed(2)
			return Number(value).toFixed(2) + " M";
		}
		else if (value >= 1000){  //1Th
			value = value/1000000
			value.toFixed(2)
			return Number(value).toFixed(2) + " Th";
		}
	}
}