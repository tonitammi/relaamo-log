import CreateLogView from "./CreateLogView.svelte";
import EventLogView from "./EventLogView.svelte";
import LogsView from "./LogsView.svelte";
import MainView from "./MainView.svelte";
import ExportView from "./ExportView.svelte";
import SummaryView from "./SummaryView.svelte";
import JsonView from "./JsonView.svelte";
import CsvView from "./CsvView.svelte";

export const routes = {
  "/": MainView,
  "/kirjaukset/:tab?": LogsView,
  "/luo-kirjaus/:editKey?": CreateLogView,
  "/luo-tapahtuma-kirjaus/:editKey?": EventLogView,
  "/hae-data": ExportView,
  "/yhteenveto": SummaryView,
  "/data-export": JsonView,
  "/csv-test": CsvView
}