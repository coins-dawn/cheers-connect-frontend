import data from "@/work/output/station_detail_list.json"

export const stations = data.station_detail_list.map(station => ({ ...station, kanji: station.name.replace("(東京都)", "") }))