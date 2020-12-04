<template>
  <div class="container">
    <div class="row my-4">
      <div class="col-lg-5 mx-auto" style="height: 460px;"> 
        <h1 class="my-2 text-center">Vue Calendar</h1>
        <div class="ml-3 mr-3 d-flex justify-content-between">
          <div>{{currentYear}}</div>
          <div>{{currentMouthName}}</div>
        </div>
        <table class="table table-borderless">
          <thead>
            <tr>
              <th class="text-center" v-for="day in days" :key="day">{{day}}</th>
            </tr>
          </thead>
          <tbody v-for="(wks, i) in calendarDays" :key="i">
            <tr>
              <td
                class="text-center"
                :class="{'currentDay' : currentDay(day)}"
                v-for="(day, k) in calendarDays[i]" :key="k"
              >
                <div v-html="day"></div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="col-lg-12 d-flex justify-content-between position-absolute" style="bottom:1px; left: 0;">
          <button class="btn btn-light" @click="prevBtn()">prev</button>
          <button class="btn btn-light" @click="nextBtn()">next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentMouth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      calendarDays: [],
      days: ['Sun', "Mon", "Tue", "Wed", "Thu","Fri","Sat"]
    }
  },
  watch: {
    currentMouth() {
      this.calendarDays = this.monthIntDays()
    }
  },
  mounted() {
    this.calendarDays = this.monthIntDays()
  },
  computed: {
    currentMouthName() {
      return new Date(this.currentYear, this.currentMouth).toLocaleString("default", {month:'long'})
    }
  },
  methods: {
    monthIntDays() {
      const monthdays = new Date(this.currentYear, this.currentMouth + 1, 0).getDate()
      const daycount = new Array(monthdays).fill().map((_, i) => {return i+1})  //填充一个月内所有日期到数组
      let result = []

      // 遍历分割7天的日期成数组，再push到总数组内
      let offset = 0
      daycount.forEach(() => {
        // 当月开始日
        let startDay = new Date(this.currentYear, this.currentMouth, 1).getDay()
        // 开始日前填充空字符串
        if (startDay > 0 && result.length == 0) {
          const sDays = new Array(startDay).fill("&nbsp")
          const fDays = daycount.splice(offset, offset + 7 - startDay)
          const days = [...sDays, ...fDays]
          result.push(days)
        } else {
          result.push(daycount.splice(offset, offset+7))
        }
      })
      // 分割剩余内容再push
      if (daycount.length != 0) {
        result.push(daycount)
      }

      // console.log([daycount, result])
      return result
    },
    prevBtn() {
      if (this.currentMouth == 0) {
        this.currentMouth = 11
        this.currentYear--
      } else {
        this.currentMouth--
      }
      this.dayweks = []
    },
    nextBtn() {
      if (this.currentMouth == 11) {
        this.currentMouth = 0
        this.currentYear++
      } else {
        this.currentMouth++
      }
      this.dayweks = []
    },
    currentDay(daynum) {
      const cday = new Date(this.currentYear, this.currentMouth, daynum).toDateString()
      const cdate = new Date().toDateString()
      return cday == cdate ? true : false
    }
  }
}
</script>

<style scoped>
  .currentDay {
    color: rgb(255, 100, 100);
    /* border: 1px solid #ccc; */
  }
</style>