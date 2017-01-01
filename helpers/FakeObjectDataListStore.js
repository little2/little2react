/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var faker = require('faker');
faker.locale = "zh_TW";
class FakeObjectDataListStore {
  constructor(/*number*/ size, dataType){
    this.size = size || 2000;
    this._cache = [];
    this.dataType = dataType;
  }

  createFakeRowObjectData(/*number*/ index) /*object*/ {

    switch(this.dataType)
    {

      case "dealer":
        return this.dealerFaker(index);
      break;

      case "vehicleinventory":
        return this.vehicleinventoryFaker(index);
      break;

      case "dispatchlog":
        return this.dispatchlogFaker(index);
      break;

      case "userpass":
        return this.userpassFaker(index);
      break;

      default:
        return this.dealerFaker(index);
      break;

    }
  }

  getDate()
  {
    let dob = faker.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)"));
    dob = dob.getFullYear() + "-" + (dob.getMonth()+1) + "-" + dob.getDate();  // First month is "1"
    return dob;
  }

  userpassFaker(index)
  {
    return {
      userId: faker.random.number(),
      userName: faker.name.findName(),
      password: faker.random.number()
    };

  }

  dispatchlogFaker(index)
  {
    return {
      dispatchId: faker.random.number(),
      dispatchId: faker.random.number(),
      soldRecId: faker.random.number(),
      activeDate: this.getDate(),
      engBodyNo: faker.random.word(),
      oriDealerId: faker.random.number(),
      newDealerId: faker.random.number(),
      operatorName: faker.name.findName(),
      memo: faker.random.words(),
    };

  }


  vehicleinventoryFaker(index)
  {
    return {
      dealerId: faker.random.number(),
      sort: index,
      vNo : faker.random.number(),
      vendorId: faker.company.companyName(),
      engBodyNo: faker.random.word(),
      dealerBoss: faker.name.findName(),
      modelId: faker.random.word(),
      vColor: faker.commerce.color(),
      vInDate: this.getDate(),
      vOutDate: this.getDate(),
      memo: faker.random.words(),
    };

  }

  dealerFaker(index)
  {



    return {
      dealerId: faker.random.number(),
      sort: index,
      dealerTypeId : faker.random.number(),
      dealerTitle: faker.company.companyName(),
      dealerShortTitle: faker.company.companySuffix(),
      dealerBoss: faker.name.findName(),
      dealerTel: faker.phone.phoneNumber(),
      dealerFax: faker.phone.phoneNumber(),
      dealerMobilePhone: faker.phone.phoneNumber(),
      dealerAddress: faker.address.streetAddress(),
      VATNumber: faker.random.number(),
      dealerBossBirth: this.getDate(),
      dealerLongitude: faker.address.longitude(),
      dealerLatitude: faker.address.latitude(),
      companyName: faker.company.companyName(),
      dealerURL: faker.internet.url(),
      deviceOSType: faker.lorem.sentence(),
      deviceId: faker.random.uuid(),
      memo: faker.random.words(),
    };
  }

  getObjectAt(/*number*/ index) /*?object*/ {
    if (index < 0 || index > this.size){
      return undefined;
    }
    if (this._cache[index] === undefined) {
      this._cache[index] = this.createFakeRowObjectData(index);
    }
    return this._cache[index];
  }

  /**
  * Populates the entire cache with data.
  * Use with Caution! Behaves slowly for large sizes
  * ex. 100,000 rows
  */
  getAll() {
    if (this._cache.length < this.size) {
      for (var i = 0; i < this.size; i++) {
        this.getObjectAt(i);
      }
    }
    return this._cache.slice();
  }

  getSize() {
    return this.size;
  }
}

module.exports = FakeObjectDataListStore;
