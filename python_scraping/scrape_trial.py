import urllib.request as urllib2
import urllib.parse
from bs4 import BeautifulSoup

URL = "https://jp.op.gg/summoner/champions/userName=39cm"

#==========SeleniumのHeadlessモードをつかう==================

# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options

# # ブラウザのオプションを格納する変数をもらってきます。
# options = Options()
# # Headlessモードを有効にする（コメントアウトするとブラウザが実際に立ち上がります）
# options.set_headless(True)
# # ブラウザを起動する
# driver = webdriver.Chrome(chrome_options=options)
# # ブラウザでアクセスする
# driver.get( URL )
# # HTMLを文字コードをUTF-8に変換してから取得します。
# html = driver.page_source.encode('utf-8')

#==========Seleniumここまで==================

html = urllib2.urlopen(URL)

# BeautifulSoupで扱えるようにパースします
soup = BeautifulSoup(html, 'html.parser')

title_tag = soup.title
title = title_tag.string

print(title_tag)
print(title)

summoner_name = soup.select_one('body > div.l-wrap.l-wrap--summoner > div.l-container > div > div > div.Header > div.Profile > div.Information > span').string
print(summoner_name)

champion_name = soup.select_one('#SummonerLayoutContent > div.tabItem.Content.SummonerLayoutContent.summonerLayout-champions > div > div > div.Content.tabItems > div.tabItem.season-15 > table > tbody > tr:nth-child(1) > td.ChampionName.Cell > a').string
win = soup.select_one('#SummonerLayoutContent > div.tabItem.Content.SummonerLayoutContent.summonerLayout-champions > div > div > div.Content.tabItems > div.tabItem.season-15 > table > tbody > tr:nth-child(1) > td.RatioGraph.Cell > div > div > div.Text.Left').string
lose = soup.select_one('#SummonerLayoutContent > div.tabItem.Content.SummonerLayoutContent.summonerLayout-champions > div > div > div.Content.tabItems > div.tabItem.season-15 > table > tbody > tr:nth-child(1) > td.RatioGraph.Cell > div > div > div.Text.Right').string
print(champion_name, win, lose)


#=====Seleniumをとじる=========
#driver.quit()
