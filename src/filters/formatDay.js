import dayjs from 'dayjs'

export default function (date, format) {

  return dayjs(date).format(format)

}