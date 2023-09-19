import { Component, OnInit } from '@angular/core';

interface CalendarioInterface {
  dia: Date; // O dia do mês
  events: any[]; // Uma lista de eventos para o dia
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'calendario';

  mesesEmIngles: any[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  dataBase = new Date();
  calendario: CalendarioInterface[] = [];
  eventos: any[] = [
    {
      date: new Date(2023, 7, 6),
      events: [{ nome: ['Evento teste 1'], horario: new Date().getHours() }],
    },
    {
      date: new Date(2023, 9, 2),
      events: [{ nome: ['Evento teste 2'], horario: new Date().getHours() }],
    },
    {
      date: new Date(2023, 10, 4),
      events: [{ nome: ['Evento teste 3'], horario: new Date().getHours() }],
    },
  ];

  ngOnInit(): void {
    this.buildCalendar();
  }

  buildCalendar() {
    //Data base = Data atual
    //Semana = Início e fim
    // console.log(dataBase);

    this.calendario = [];

    let inicioMes = new Date(
      this.dataBase.getFullYear(),
      this.dataBase.getMonth(),
      1
    );

    let fimMes = new Date(
      this.dataBase.getFullYear(),
      this.dataBase.getMonth() + 1,
      0
    );

    // console.log(inicioMes.getDate()); //0, 1, 2, 3, 4, 5 => no 5, se começa o mês, os dias do 0 ao 4, são dias do mês anterior
    // console.log(fimMes.getDate());

    let primeiroDiaSemanaMes = inicioMes.getDay();
    let ultimoDiaSemanaMes = fimMes.getDay();

    // console.log(primeiroDiaSemanaMes, ultimoDiaSemanaMes);

    for (let i = inicioMes.getDate(); i <= fimMes.getDate(); i++) {
      this.calendario.push({
        dia: new Date(this.dataBase.getFullYear(), this.dataBase.getMonth(), i),
        events: [],
      });
    }

    if (this.eventos.length > 0) {
      this.eventos.forEach((element) => {
        let indice = this.calendario.findIndex(
          (item) => item.dia === element.dia
        );
        if (indice !== -1) {
          this.calendario[indice].events = element.events;
        }
      });
    }

    this.calendarioAtual();

    console.table(this.calendario);
    console.log(this.dataBase.getMonth() + 1);
    console.log(this.dataBase.getFullYear());
  }

  proximo() {
    this.dataBase.setMonth(this.dataBase.getMonth() + 1);
    this.buildCalendar();
  }

  anterior() {
    this.dataBase.setMonth(this.dataBase.getMonth() - 1);
    this.buildCalendar();
  }

  calendarioAtual() {
    let mesAno =
      this.mesesEmIngles[this.dataBase.getMonth()] +
      ', ' +
      this.dataBase.getFullYear();
    return mesAno;
  }

  selecionaDia(data: Date) {
    console.log(data.getDate());
  }
}
