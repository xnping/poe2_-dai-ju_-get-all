
import requests
from bs4 import BeautifulSoup

def get_distilled_base_types():
    url = "https://poe2db.tw/cn/Stackable_Currency"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
    }

    try:
        print("正在获取精炼物品数据...")
        response = requests.get(url, headers=headers, timeout=30)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            # 查找包含"精炼物品"的标签页
            tabs = soup.find_all('div', class_='tab-pane fade')
            distilled_tab = None
            for tab in tabs:
                if '精炼物品' in str(tab):
                    distilled_tab = tab
                    break
            
            if distilled_tab:
                items = distilled_tab.find_all('div', class_='d-flex border rounded')
                distilled_data = []
                
                print("\n开始解析物品数据...")
                for idx, item in enumerate(items, 1):
                    try:
                        # 提取物品名称
                        name_elem = item.find('a', class_='item_currency')
                        if not name_elem:
                            print(f"第 {idx} 个物品没有找到 item_currency 链接")
                            continue
                        
                        print(f"\n处理第 {idx} 个物品:")
                        print("HTML结构:")
                        print(name_elem.prettify())
                        
                        # 获取所有文本内容
                        texts = []
                        for string in name_elem.stripped_strings:
                            text = string.strip()
                            if text:  # 只添加非空文本
                                texts.append(text)
                                print(f"找到文本: {text}")
                        
                        if len(texts) < 1:
                            print(f"第 {idx} 个物品没有找到任何文本内容")
                            continue
                        
                        # 第一个文本是英文名称
                        english_name = texts[0]
                        print(f"英文名称: {english_name}")
                        
                        # 第二个文本是中文名称（如果存在）
                        chinese_name = texts[1] if len(texts) > 1 else english_name
                        print(f"中文名称: {chinese_name}")
                        
                        # 只添加以"Distilled"开头的物品
                        if english_name.startswith("Distilled"):
                            distilled_data.append({
                                "序号": idx,
                                "英文名称": english_name,
                                "中文名称": chinese_name,
                                "BaseType": english_name  # 直接使用英文名称作为BaseType
                            })
                            print(f"已添加到数据列表: {english_name}")
                        else:
                            print(f"不是Distilled物品，跳过: {english_name}")
                        
                    except Exception as e:
                        print(f"处理第 {idx} 个物品时出错: {str(e)}")
                        continue

                # 输出结果
                if distilled_data:
                    print("\n精炼物品的BaseType信息:")
                    print(f"{'='*100}")
                    print(f"{'序号':<6} {'英文名称':<30} {'中文名称':<30} {'BaseType':<30}")
                    print(f"{'-'*100}")
                    
                    for item in distilled_data:
                        print(f"{item['序号']:<6} {item['英文名称']:<30} {item['中文名称']:<30} {item['BaseType']:<30}")
                    
                    print(f"{'='*100}")
                    print(f"总计: {len(distilled_data)} 个精炼物品")
                else:
                    print("没有找到任何精炼物品的BaseType信息")

            else:
                print("未找到精炼物品标签页")

        else:
            print(f"请求失败，状态码: {response.status_code}")

    except Exception as e:
        print(f"发生错误: {e}")

if __name__ == "__main__":
    get_distilled_base_types()