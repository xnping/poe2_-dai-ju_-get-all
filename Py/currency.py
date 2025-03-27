
import requests
from bs4 import BeautifulSoup
import urllib.parse

def extract_base_type(metadata_path, chinese_name):
    # 解码URL编码的字符串
    decoded = urllib.parse.unquote(metadata_path)
    
    # 获取最后一个部分（实际的BaseType标识符）
    base_type = decoded.split('/')[-1]
    
    # 基础通货映射
    base_currency_map = {
        'WeaponQuality': "Blacksmith's Whetstone",
        'ArmourQuality': "Armourer's Scrap",
        'MagicQuality': "Arcanist's Seal",
        'FlaskQuality': "Glassblower's Bauble",
        'GemQuality': "Gemcutter's Prism",
        'Identification': "Scroll of Knowledge",
        'RerollRare': "Chaos Orb",
        'Duplicate': "Mirror of Kalandra",
        'UpgradeToRare': "Orb of Alchemy",
        'UpgradeRandomly': "Orb of Chance",
        'UpgradeToMagic': "Orb of Transmutation",
        'AddModToRare': "Exalted Orb",
        'UpgradeMagicToRare': "Regal Orb",
        'AddModToMagic': "Orb of Augmentation",
        'ModValues': "Divine Orb",
        'RemoveMod': "Orb of Annulment",
        'RhoaFeather': "Albino Rhoa Feather",
        'Corrupt': "Vaal Orb",
        'GoldCoin': "Gold Coin"
    }

    # 处理技能宝石插槽相关
    if 'AddSkillGemSocket3' in base_type:
        return "Lesser Jeweller's Orb"
    elif 'AddSkillGemSocket4' in base_type:
        return "Greater Jeweller's Orb"
    elif 'AddSkillGemSocket5' in base_type:
        return "Perfect Jeweller's Orb"
    elif 'AddEquipmentSocket' in base_type:
        return "Artificer's Orb"
    
    # 处理碎片
    if 'Shard' in base_type:
        if 'UpgradeToMagic' in base_type:
            return "Transmutation Shard"
        elif 'UpgradeToRare' in base_type:
            return "Alchemy Shard"
        elif 'UpgradeRandomly' in base_type:
            return "Chance Shard"
        elif 'UpgradeMagicToRare' in base_type:
            return "Regal Shard"
        elif 'AddEquipmentSocket' in base_type:
            return "Artificer's Shard"
    
    # 处理远征物品
    if 'ExpeditionVendor' in base_type:
        if 'Faction1' in base_type:
            return "Broken Circle Artifact"
        elif 'Faction2' in base_type:
            return "Black Scythe Artifact"
        elif 'Faction3' in base_type:
            return "Order Artifact"
        elif 'Faction4' in base_type:
            return "Sun Artifact"
    
    # 处理圣所钥匙
    if 'Sanctum' in base_type:
        if 'Drop' in base_type:
            if 'Bronze' in base_type:
                return "Bronze Key (Drop)"
            elif 'Silver' in base_type:
                return "Silver Key (Drop)"
            elif 'Gold' in base_type:
                return "Gold Key (Drop)"
        else:
            if 'Bronze' in base_type:
                return "Bronze Key"
            elif 'Silver' in base_type:
                return "Silver Key"
            elif 'Gold' in base_type:
                return "Gold Key"
    
    # 处理其他基础通货
    for key, value in base_currency_map.items():
        if key in base_type:
            return value
    
    # 处理特殊情况
    if 'RefreshExpedition' in base_type:
        return "Exotic Coinage"
    
    # 如果没有匹配到任何规则，返回清理后的base_type
    return base_type.replace('Currency', '').strip()

def get_base_types():
    url = "https://poe2db.tw/cn/Stackable_Currency"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
    }

    try:
        print("正在获取数据...")
        response = requests.get(url, headers=headers, timeout=30)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            active_tab = soup.find('div', class_='tab-pane fade show active')
            
            if active_tab:
                items = active_tab.find_all('div', class_='d-flex border rounded')
                base_types_data = []
                
                for idx, item in enumerate(items, 1):
                    try:
                        # 提取物品名称
                        name_elem = item.find('a', class_='item_currency')
                        if not name_elem:
                            continue
                            
                        name = name_elem.text.strip()
                        
                        # 提取英文BaseType
                        base_type = "未知"
                        data_hover = name_elem.get('data-hover', '')
                        if data_hover and 'BaseItemTypes' in data_hover:
                            metadata_path = data_hover.split('c=')[-1]
                            base_type = extract_base_type(metadata_path, name)
                        
                        base_types_data.append({
                            "序号": idx,
                            "中文名称": name,
                            "BaseType": base_type
                        })
                        
                    except Exception as e:
                        print(f"处理第 {idx} 个物品时出错: {str(e)}")
                        continue

                # 输出结果
                if base_types_data:
                    print("\n可堆叠通货物品的BaseType信息:")
                    print(f"{'='*80}")
                    print(f"{'序号':<6} {'中文名称':<20} {'BaseType':<40}")
                    print(f"{'-'*80}")
                    
                    for item in base_types_data:
                        print(f"{item['序号']:<6} {item['中文名称']:<20} {item['BaseType']:<40}")
                    
                    print(f"{'='*80}")
                    print(f"总计: {len(base_types_data)} 个物品")
                else:
                    print("没有找到任何BaseType信息")

            else:
                print("未找到活动标签页")

        else:
            print(f"请求失败，状态码: {response.status_code}")

    except Exception as e:
        print(f"发生错误: {e}")

if __name__ == "__main__":
    get_base_types()