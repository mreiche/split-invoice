class Party {
  name:string="";
  debt:string="0";
  paid:string="0";
  difference:number;
  overage:number;
  balance:number;
}

interface Balance {
  from:Party;
  to:Party;
  amount:number;
}

export class CurrencyValueConverter {
  toView(value) {
    if (value) return Number.parseFloat(value).toLocaleString(window.navigator.language, {maximumFractionDigits:2,minimumFractionDigits:2});
    else return value;
  }
}

export class App {
  private debtTotal:number;
  private paidTotal:number;
  private tip:number;
  private target:number;
  private parties:Party[] = [];
  private balances:Balance[];

  activate() {
    this.parties.push(new Party());
  }
  checkParty() {
    const lastParty = this.parties[this.parties.length-1];
    if (lastParty.name.length > 0) {
      this.parties.push(new Party());
    } else {
      this.parties.pop();
    }
  }
  calc() {
    this.debtTotal = 0;
    this.paidTotal = 0;
    let activeParties = 0;

    this.parties
      .filter((party) => party.name.length > 0)
      .forEach(party => {
        let debt = Number.parseFloat(party.debt);
        let paid = Number.parseFloat(party.paid);
        this.debtTotal += debt;
        this.paidTotal += paid;
        party.difference = paid-debt;
        ++activeParties;
      });

    this.tip = this.paidTotal - this.debtTotal;
    this.target = this.tip/activeParties;

    this.parties
      .filter((party) => party.name.length > 0)
      .forEach(party => {
        party.overage = party.difference - this.target;
        party.balance = party.overage;
      });

    this.balances = [];

    const parties = this.parties.slice();

    parties
      .filter(party => party.balance > 0)
      .sort((partyA, partyB) => partyA.balance - partyB.balance)
      .forEach(partyA => {
        for (const partyB of parties
          .sort((partyA, partyB) => partyB.balance - partyA.balance)
          .filter(partyB => partyB.balance < 0)) {

          let balance = Math.min(Math.abs(partyB.balance), partyA.balance);
          console.log(partyA.name, partyA.balance, partyB.name, partyB.balance, balance);

          partyA.balance -= balance;
          partyB.balance += balance;

          this.balances.push({
            from: partyB,
            to: partyA,
            amount: balance
          });

          if (partyA.balance == 0) break;
        }
      });
  }

}
