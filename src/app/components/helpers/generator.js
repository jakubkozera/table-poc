import uuid from 'uuid';
import { sample, range } from 'lodash';
import schema2object from 'schema2object';
import generators from 'annogenerate';

const generate = schema2object.properties2object;
const tasks = ['Conctact HR', 'Send Emails', 'Some other task', 'Yet another task'];
const status = ['pending', 'approved', 'denied', 'smart'];
const firstnames = [
    'Jack', 'Bo', 'John', 'Jill', 'Angus', 'Janet', 'Cecilia',
    'Daniel', 'Marge', 'Homer', 'Trevor', 'Fiona', 'Margaret', 'Ofelia',
    'Mike', 'Don', 'Dirk', 'Greg', 'Arthur', 'Ike', 'Robert', 'Ulrich'
];
const lastnames = [
    'MacGyver', 'Johnson', 'Jackson', 'Robertson', 'Hull', 'Hill', 'Simpson',
    'Ikesen', 'Cruise', 'Schwarz', 'Xu', 'Li', 'Lee', 'White', 'Brown'
];

const first = ['App', 'No', 'Micro', 'Ora', 'Sun', 'Soft', 'Accen', 'Syman'];
const second = ['le', 'kia', 'soft', 'cle', 'ice', 'ify', 'ture', 'tec', 'ware', ' Solutions'];
const third = ['Ltd.', 'Inc.'];
const countries = ['United States of America', 'France', 'Germany', 'Denmark', 'Australia', 'England', 'United Arab Emirates', 'Canada']

function randomBool(){
    return Math.random() < 0.2;
}

function randomDate(start, end) {
    return Math.round(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getTime() / 1000)
  }
const generateRows = (amount, { definitions, properties }) =>
    range(amount).map(() =>
        generate({
            generators,
            fieldGenerators: {
                id() {
                    return uuid.v4();
                },
                isRed(){
                    return randomBool();
                },
                status() {
                    return sample(status)
                },
                task(){
                    return sample(tasks);
                },
                name() {
                    return `${sample(firstnames)} ${sample(lastnames)}`;
                },
                fullName() {
                    return {
                        first: sample(firstnames), last: sample(lastnames)
                    };
                },
                country() {
                    return sample(countries)
                },
                company() {
                    return `${sample(first)}${sample(second)} ${sample(third)}`;
                },
                assistant(){
                    return `${sample(firstnames)} ${sample(lastnames)}`;
                },
                amount: generators.number.bind(null, 0, 100000),
                submitted() { return  randomDate(new Date(2018, 0, 1), new Date())}, 
                active() {
                    return sample([true, false]);
                }
            },
            properties,
            definitions
        })
    );

export default generateRows;