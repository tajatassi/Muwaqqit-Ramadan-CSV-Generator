import { Response, Entry } from './models/response'
import { Output } from './models/output'
import config from '../config.json'
import * as fs from 'fs'

const settings = {
    // TODO: Can we get this information from an address?
    filename: "file.csv",
}

const baseUrl: string = "https://www.muwaqqit.com/api.json"

const RamadanStart: string = "2023-03-22"
const EidDate = "2023-04-22"

var params = {
    ...config,
}

let res: Output[] = [];

async function GetRamadanData() {
    await GetMonthData(RamadanStart, RamadanStart, EidDate)
    // We need a 30 second timeout to avoid getting Rate Limited
    await new Promise(f => setTimeout(f, 15000));
    await GetMonthData(EidDate, RamadanStart, EidDate)
    await PrepareCsv()
}

const GetMonthData = async (date: string, ramadanStart: string, EidDate: string) => {
    const uri: URL = new URL(baseUrl)
    params['d'] = date
    Object.keys(params).forEach(key => uri.searchParams.append(key, params[key]))
    const MarchData = await fetch(uri).then(res => res.json());

    const m : Response = MarchData;

    m.list.forEach(function (v: Entry) {
        const fajrDate: string = v.fajr_date;

        if (Date.parse(fajrDate) >= Date.parse(ramadanStart) && Date.parse(fajrDate) <= Date.parse(EidDate)) {
            const current: Output = {
                date: fajrDate,
                fajr_time: v.fajr_time,
                sunrise_time: v.sunrise_time,
                duhur_time: v.zohr_time,
                asr_time: v.mithl_time,
                asr_hanafi_time: v.mithlain_time,
                maghreb_time: v.sunset_time,
                isha_time: v.esha_time
            }

            res.push(current);
        } else {
            console.log(fajrDate, " is outside the date range");
        }
    })
}

async function PrepareCsv() {
    const csvString = [
        ["Date", "Fajr Time", "Sunrise Time", "Duhur Time", "Asr Time", "Asr Time (Hanafi)", "Maghreb Time", "Isha Time"],
        ...res.map(item => [
            item.date,
            item.fajr_time,
            item.sunrise_time,
            item.duhur_time,
            item.asr_time,
            item.asr_hanafi_time,
            item.maghreb_time,
            item.isha_time
        ])
    ].map(e => e.join(','))
        .join("\n");

    await fs.writeFile(settings.filename, csvString, (error) => {
        if(error) {
            console.log("Error")
        }
    });
}


GetRamadanData();