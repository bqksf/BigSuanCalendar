# coding: utf-8

from leancloud import Engine

import requests
from bs4 import BeautifulSoup
import re

engine = Engine()


def remove_chinese(bs):
    bs = str(bs)
    p = re.compile(r'[\u4e00-\u9fa5,（,）,，,。,：]')
    bs = p.findall(bs)
    bs = ''.join(bs)
    return bs


@engine.define
def daSuan():
    data = {
        'tipText': '此页面内容仅供娱乐使用',  # 此页面内容仅供娱乐使用，纯属为爱发电。如想添加其他功能，可以告诉我(^-^)
        'whatBtn': '获取帮助',  # 更多资源
        'modal': '可点下方“联系客服”，看到消息会第一时间回复您'
    }
    return data


@engine.define
def yanYuan(sex, year, month, day, hour):
    url = "http://www.dfsmw.com/hunyin/"
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'http://www.dfsmw.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Safari/605.1.15',
        'Referer': 'http://www.dfsmw.com/hunyin/'
    }
    form_data = {
        'sex': sex,  # 1
        'datetype': 1,  # 1
        'year': year,  # 2000
        'month': month,  # 1
        'day': day,  # 1
        'hour': hour  # 0
    }
    res = requests.post(url, data=form_data, headers=headers)
    soup = BeautifulSoup(res.text, "html.parser")

    title_arr = soup.find_all('td')
    xing_bie = remove_chinese(title_arr[1])
    ba_zi = remove_chinese(title_arr[5])
    da_yun = remove_chinese(title_arr[7])
    sheng_xiao = remove_chinese(title_arr[9])
    ben_ming = remove_chinese(title_arr[11])
    title = "性别：%s\n八字：%s\n大运：%s\n生肖：%s\n本命元神：%s" % \
            (xing_bie, ba_zi, da_yun, sheng_xiao, ben_ming)

    result_arr = soup.find_all('p')
    zonghe = remove_chinese(result_arr[0])
    jiehun_time = remove_chinese(result_arr[1])
    taohua_num = remove_chinese(result_arr[2])
    peiou_xingge = remove_chinese(result_arr[3])
    wending_xishu = remove_chinese(result_arr[4])
    zhuwang_zhishu = remove_chinese(result_arr[5])
    zinv_yunshu = remove_chinese(result_arr[6])
    result = [title, zonghe, jiehun_time, taohua_num, peiou_xingge, wending_xishu, zhuwang_zhishu, zinv_yunshu]
    return result


@engine.define
def heHun(sex, date1, hour1, date2, hour2):
    url = "http://www.dfsmw.com/hehun/"
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'http://www.dfsmw.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Safari/605.1.15',
        'Referer': 'http://www.dfsmw.com/hehun/'
    }
    form_data = {
        'sex': sex,  # 1
        'date1': date1,  # 2000-2-3-10
        'hour1': hour1,  # 0
        'date2': date2,  # 2000-2-4-14
        'hour2': hour2  # 0
    }
    res = requests.post(url, data=form_data, headers=headers)
    soup = BeautifulSoup(res.text, "html.parser")
    result = soup.find_all('div', class_='kui-info-desc')[1]
    result = remove_chinese(result)
    result = re.sub("）配对分析", "）\n\n配对分析", result)
    result = re.sub("生肖配对恋爱建议", "\n\n生肖配对恋爱建议", result)
    result = re.sub("缘分评价", "\n\n缘分评价", result)
    result = re.sub("主要原因", "\n\n主要原因", result)
    result = re.sub("东方算命网提示你注意：仅根据属相断定两个人合不合是很片面的，在整个合婚方法中属相起到作用很小，所以仅作参考，后面的生辰八字全面合婚才是最关键也是最准确的。",
                    "\n\n提示你注意：仅根据属相断定两个人合不合是很片面的，在整个合婚方法中属相起到作用很小，所以仅作参考", result)
    return result
