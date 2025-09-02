class Clock{
    constructor(){
        this.totalHours = 0;
        this.hour = 0;
        this.days = 0;
        this.months = 0;
        this.years = 0;
    }

    addHours = (number_of_hours)=>{
        this.totalHours +=number_of_hours;
        this.hour = this.totalHours%24;
        this.days = parseInt(this.totalHours/24)
        this.months = parseInt(this.days/30);
        this.years = parseInt(this.months/12);
    }

    removeHours = (number_of_hours)=>{
        this.totalHours -=number_of_hours;
        this.hour = this.totalHours%24;
        this.days = parseInt(this.totalHours/24)
        this.months = parseInt(this.days/30);
        this.years = parseInt(this.months/12);
    }
}