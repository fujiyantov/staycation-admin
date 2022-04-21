const chai = require("chai");
const chaiHttp = require("chai-http")
const expect = chai.expect
const app = require('../app')
const fs = require('fs')

chai.use(chaiHttp)

describe("API ENDPOINT TESTING", () => {

    /* 
        Route GET
    */
    it("It should be status  200", (done) => {
        chai.request(app)
            .get("/api/v1/member/landing-page")
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('Object')
                expect(res.body).to.have.property('hero')
                expect(res.body.hero).to.have.all.keys('treasure', 'traveler', 'city')
                expect(res.body).to.have.property('mostPicked')
                expect(res.body.mostPicked).to.have.an('array')
                done()
            })
    })

    /* 
        Route POST
    */
    it("It should be status  201", (done) => {
        // set data sample
        const image = __dirname + '/buktibayar.jpeg'
        const dataSample = {
            image,
            idItem: '5e96cbe292b97300fc902222',
            duration: 2,
            bookingStartDate: '2022-05-10',
            bookingEndDate: '2022-05-12',
            firstName: 'Yanto',
            lastName: 'San',
            email: 'san@app.com',
            phoneNumber: '081211735338',
            accountHolder: 'itce',
            bankForm: 'BRI',
        }

        chai.request(app)
            .post("/api/v1/member/booking")
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('idItem', dataSample.idItem)
            .field('duration', dataSample.duration)
            .field('bookingStartDate', dataSample.bookingStartDate)
            .field('bookingEndDate', dataSample.bookingEndDate)
            .field('firstName', dataSample.firstName)
            .field('lastName', dataSample.lastName)
            .field('email', dataSample.email)
            .field('phoneNumber', dataSample.phoneNumber)
            .field('accountHolder', dataSample.accountHolder)
            .field('bankForm', dataSample.bankForm)
            .attach('image', fs.readFileSync(dataSample.image), 'buktibayar.jpeg')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(201)
                done()
            })
    })
})