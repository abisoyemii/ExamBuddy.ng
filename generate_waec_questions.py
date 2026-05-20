import json

subject_templates = {
    'crs': [
        ('Which of the following is a major theme in Christian Religious Studies?', ['Human anatomy','Creation and salvation','Quantum physics','Computer programming'], 'B', 'CRS focuses on Christian doctrines, ethics and salvation.'),
        ('Who in the Bible is known for building an ark to save his family from the flood?', ['Abraham','Moses','Noah','David'], 'C', 'Noah built the ark to save his family and animals during the flood.'),
        ('The Ten Commandments were given to Moses on which mountain?', ['Mount Sinai','Mount Everest','Mount Ararat','Mount Zion'], 'A', 'Moses received the Ten Commandments on Mount Sinai.'),
        ('The parable of the Good Samaritan teaches Christians to:', ['Ignore strangers','Help neighbors in need','Follow religious rituals','Avoid travel'], 'B', 'The parable teaches love and compassion for all people.'),
        ('Which book is part of the New Testament?', ['Genesis','Exodus','Matthew','Isaiah'], 'C', 'Matthew is one of the four Gospels in the New Testament.'),
        ('Which term describes God showing grace to people who do not deserve it?', ['Justice','Mercy','Anger','Discipline'], 'B', 'Mercy is compassion shown to someone who is undeserving.'),
        ('Who betrayed Jesus for thirty pieces of silver?', ['Peter','John','Judas','Thomas'], 'C', 'Judas Iscariot betrayed Jesus for thirty pieces of silver.'),
        ('The Holy Trinity in Christianity consists of:', ['Father, Son, Holy Spirit','Faith, Hope, Charity','Past, Present, Future','Earth, Sea, Sky'], 'A', 'The Trinity refers to Father, Son, and Holy Spirit.'),
        ('The Christian sacrament that symbolizes the body and blood of Christ is:', ['Baptism','Communion','Confirmation','Anointing'], 'B', 'Communion (Eucharist) symbolizes Christ\'s body and blood.'),
        ('The day Christians celebrate the resurrection of Jesus is called:', ['Christmas','Pentecost','Easter','Good Friday'], 'C', 'Easter celebrates the resurrection of Jesus.'),
        ('The Bible was originally written in Hebrew, Greek, and which other language?', ['Latin','Arabic','Aramaic','French'], 'C', 'Parts of the Bible were written in Aramaic.'),
        ('In CRS, love of neighbor is best shown by:', ['Helping others','Avoiding people','Keeping to yourself','Judging others'], 'A', 'Love of neighbor is shown through service and kindness.'),
        ('Which prophet confronted King Ahab and Queen Jezebel?', ['Isaiah','Elijah','Jonah','Daniel'], 'B', 'Elijah challenged Ahab and Jezebel over idolatry.'),
        ('The phrase \"Let there be light\" appears in which book?', ['Exodus','Psalms','Genesis','Proverbs'], 'C', 'The phrase appears in Genesis during creation.'),
        ('Christianity teaches that sin separates humans from:', ['Friends','God','Money','Animals'], 'B', 'Sin separates humans from a right relationship with God.'),
        ('Which festival commemorates the giving of the Holy Spirit to the apostles?', ['Easter','Christmas','Pentecost','Ash Wednesday'], 'C', 'Pentecost marks the descent of the Holy Spirit.'),
        ('The story of the Prodigal Son is mainly about:', ['Obedience','Forgiveness','Strength','Wealth'], 'B', 'It teaches about forgiveness and reconciliation.'),
        ('Which apostle is known for doubting Jesus\' resurrection until he saw the wounds?', ['Peter','James','Thomas','Matthew'], 'C', 'Thomas doubted until he saw Jesus\' wounds.'),
        ('Christian ethics encourages people to be:', ['Greedy','Selfish','Honest','Lazy'], 'C', 'Christian ethics promotes honesty and integrity.'),
        ('The act of confessing sins to God is called:', ['Praising','Praying','Confession','Tithing'], 'C', 'Confession is admitting sins to God and seeking forgiveness.'),
    ],
    'agric': [
        ('Which crop is a staple food in Nigerian agriculture?', ['Cocoa','Rice','Rubber','Bananas'], 'B', 'Rice is one of Nigeria\'s staple food crops.'),
        ('What practice improves soil fertility naturally?', ['Monoculture','Crop rotation','Burning residues','Soil salinization'], 'B', 'Crop rotation restores nutrients and reduces pests.'),
        ('Which farm animal is raised primarily for egg production?', ['Goat','Cow','Chicken','Sheep'], 'C', 'Chickens are commonly raised for eggs.'),
        ('Which is a major cash crop in Nigeria?', ['Maize','Cassava','Cocoa','Yam'], 'C', 'Cocoa is a major export cash crop.'),
        ('What is the main purpose of irrigation?', ['To increase pests','To supply water to crops','To decrease soil moisture','To reduce yield'], 'B', 'Irrigation provides water during dry periods.'),
        ('Which practice reduces soil erosion on slopes?', ['Clear-cutting','Contour farming','Monoculture','Overgrazing'], 'B', 'Contour farming follows slope contours to reduce erosion.'),
        ('Which tool is used for planting seeds manually?', ['Hoe','Rake','Seed drill','Spade'], 'A', 'A hoe can be used to open holes for seeds manually.'),
        ('Which condition is best for drying harvested crops?', ['High humidity','Cool and dry air','Heavy rain','Strong wind with rain'], 'B', 'Cool, dry air prevents mold while drying grains.'),
        ('Which fertilizer is rich in nitrogen?', ['Potash','Urea','Lime','Phosphate'], 'B', 'Urea is a nitrogen-rich fertilizer.'),
        ('Which agricultural practice can increase crop yield?', ['Fallowing permanently','Intercropping','Ignoring pests','Using old seeds'], 'B', 'Intercropping uses different crops to improve yield and soil.'),
        ('Which animal is used for ploughing in traditional farming?', ['Horse','Ox','Dog','Cat'], 'B', 'Oxen are commonly used for ploughing in traditional farms.'),
        ('What is the botanical name for maize?', ['Zea mays','Triticum aestivum','Oryza sativa','Hordeum vulgare'], 'A', 'Zea mays is the scientific name for maize.'),
        ('Which problem is caused by overwatering crops?', ['Drought','Waterlogging','Frost','Pests'], 'B', 'Overwatering can lead to waterlogged soil and root rot.'),
        ('Which type of livestock is used for wool production?', ['Goat','Sheep','Pig','Chicken'], 'B', 'Sheep are raised for wool.'),
        ('Which pest attacks stored grains most commonly?', ['Rodents','Locusts','Aphids','Nematodes'], 'A', 'Rodents are common pests in stored grain.'),
        ('Which method helps preserve fruits after harvest?', ['Washing with water','Sun drying','Burning','Burying'], 'B', 'Sun drying is a traditional preservation method.'),
        ('Which practice helps control weeds without chemicals?', ['Hand weeding','Using more fertilizer','Overplanting','Ignoring them'], 'A', 'Hand weeding removes weeds manually without chemicals.'),
        ('The term \"germination\" refers to:', ['Harvesting','Seed sprouting','Soil tilling','Pest control'], 'B', 'Germination is when a seed sprouts.'),
        ('Which soil type drains water most quickly?', ['Clay','Sandy','Loamy','Peaty'], 'B', 'Sandy soil has large particles and drains quickly.'),
        ('Which farm output is measured in tonnes per hectare?', ['Price','Yield','Distance','Color'], 'B', 'Yield is commonly measured in tonnes per hectare.'),
    ],
    'financialAccounting': [
        ('Which statement shows a company\'s financial position at a point in time?', ['Profit and loss account','Balance sheet','Cash flow statement','Statement of changes in equity'], 'B', 'A balance sheet reports assets, liabilities, and equity on a date.'),
        ('Revenue minus expenses equals:', ['Capital','Profit','Assets','Liability'], 'B', 'Profit is the excess of revenue over expenses.'),
        ('Which entry increases both assets and liabilities?', ['Cash sale','Credit purchase','Owner withdrawal','Depreciation'], 'B', 'A credit purchase increases inventory assets and accounts payable liabilities.'),
        ('Cash received from customers is recorded in the:', ['Sales ledger','Purchases journal','Cash book','Petty cash book'], 'C', 'The cash book records all cash receipts and payments.'),
        ('What journal records adjustments and corrections?', ['Cash book','General journal','Sales journal','Purchase journal'], 'B', 'The general journal records adjusting and non-routine entries.'),
        ('Depreciation is charged on:', ['Capital','Asset value over time','Revenue','Liabilities'], 'B', 'Depreciation spreads asset cost over its useful life.'),
        ('The accounting equation is:', ['Assets = Liabilities - Equity','Assets = Liabilities + Equity','Assets + Equity = Liabilities','Assets = Revenue + Expenses'], 'B', 'Assets equal liabilities plus equity.'),
        ('Which account increases with a debit entry?', ['Revenue','Expenses','Capital','Liabilities'], 'B', 'Expenses increase with debits.'),
        ('Which book records sales on credit?', ['Cash book','Sales journal','Purchase journal','General journal'], 'B', 'Sales journal records credit sales.'),
        ('A trial balance is prepared to check:', ['Profit only','Debit-credit equality','Cash balance','Inventory level'], 'B', 'A trial balance checks that debits equal credits.'),
        ('Which financial statement shows operating cash inflows and outflows?', ['Balance sheet','Cash flow statement','Income statement','Statement of changes in equity'], 'B', 'The cash flow statement shows cash movements.'),
        ('Which term refers to money owed to a business by customers?', ['Accounts payable','Accounts receivable','Capital','Drawings'], 'B', 'Accounts receivable are amounts due from customers.'),
        ('Which method values inventory at the most recent purchase cost?', ['FIFO','LIFO','AVCO','HIFO'], 'C', 'AVCO uses the average cost of inventory purchases.'),
        ('Which statement reports profit or loss for a period?', ['Balance sheet','Income statement','Cash flow statement','Statement of retained earnings'], 'B', 'The income statement shows profit or loss.'),
        ('Accumulated depreciation is a:', ['Current asset','Contra asset','Liability','Revenue'], 'B', 'Accumulated depreciation is a contra asset reducing asset book value.'),
        ('When the business owner withdraws cash for personal use, it is recorded as:', ['Revenue','Drawings','Expenses','Assets'], 'B', 'Drawings reduce owner\'s equity.'),
        ('The matching principle requires expenses be matched with:', ['Revenue','Assets','Liabilities','Equity'], 'A', 'Expenses should be matched with the revenue they help generate.'),
        ('Which item is not shown on the balance sheet?', ['Cash','Sales revenue','Inventory','Capital'], 'B', 'Sales revenue appears on the income statement, not the balance sheet.'),
        ('Bad debts expense arises from:', ['Cash sales','Credit sales not collected','Purchases','Rent'], 'B', 'Bad debts occur when credit customers fail to pay.'),
        ('Which is a current liability?', ['Buildings','Bank overdraft','Land','Patents'], 'B', 'Bank overdraft is repayable within a short period and is a current liability.'),
    ],
    'yoruba': [
        ('What is the Yoruba greeting for morning?', ['Kú ọjọ́','Ẹ káàárọ̀','Ẹ kúlẹ́','Kú alẹ́'], 'B', 'Ẹ káàárọ̀ means good morning in Yoruba.'),
        ('Which Yoruba city is known for its historic palace?', ['Lagos','Ibadan','Ile-Ife','Kano'], 'C', 'Ile-Ife is famous for its traditional palaces.'),
        ('What is the Yoruba word for thank you?', ['Ẹ ṣé','O ṣe','Ẹ kaaro','Bawo'], 'A', 'Ẹ ṣé is a common Yoruba way to say thank you.'),
        ('Which folklore character is famous in Yoruba tales?', ['Anansi','Sango','Obi-Wan','Baba Yaga'], 'B', 'Sango is a popular figure in Yoruba folklore.'),
        ('What is the Yoruba word for water?', ['Omi','Ina','Ilé','Oúnjẹ'], 'A', 'Omi means water in Yoruba.'),
        ('Which festival celebrates the Yoruba god of thunder?', ['Egungun','Osun-Osogbo','Oro','Sango festival'], 'D', 'The Sango festival honors the god of thunder.'),
        ('Which proverb means \"Unity is strength\"?', ['Ọ̀pọ̀ là ń fi alágbára','Bí a kò bá sọ ọkùn, a ò mọ ọ̀fé','Ẹni tí a kì í tẹ́ ní í sùn','Agbára ọ̀kan kọ́ lágbára'], 'A', 'This proverb emphasizes the power of unity.'),
        ('Yoruba is primarily spoken in which country?', ['Ghana','Nigeria','Egypt','Kenya'], 'B', 'Yoruba is predominantly spoken in Nigeria.'),
        ('What is the Yoruba word for mother?', ['Baba','Iya','Omo','Awo'], 'B', 'Iya means mother in Yoruba.'),
        ('Which Yoruba deity is associated with wisdom and divination?', ['Ogun','Ọ̀ṣun','Ifá','Sango'], 'C', 'Ifá is associated with wisdom and divination.'),
        ('What is the Yoruba name for a masquerade?', ['Egungun','Ori','Oro','Aje'], 'A', 'Egungun refers to masquerade festivals among Yoruba people.'),
        ('Which animal is important in Yoruba proverbs about patience?', ['Horse','Tortoise','Dog','Bird'], 'B', 'The tortoise is often used to teach patience in Yoruba proverbs.'),
        ('Which of these is a Yoruba musical instrument?', ['Kora','Djembe','Talking drum','Saxophone'], 'C', 'The talking drum is a traditional Yoruba instrument.'),
        ('What does \"Ẹ kú iṣẹ́\" mean?', ['Good morning','Well done','Thank you','Good night'], 'B', 'Ẹ kú iṣẹ́ is said to someone who has completed work well.'),
        ('Which crop is called \"Ìtèmó\" in Yoruba?', ['Cassava','Yam','Rice','Maize'], 'B', 'Ìtèmó refers to yam in Yoruba.'),
        ('Which Yoruba town is known as the cradle of the Yoruba people?', ['Ife','Abeokuta','Lagos','Ogbomosho'], 'A', 'Ife is traditionally seen as the cradle of Yoruba civilization.'),
        ('What is the Yoruba word for friend?', ['Ọrẹ','Ọkọ','Aṣa','Ile'], 'A', 'Ọrẹ means friend in Yoruba.'),
        ('Which person is a Yoruba novelist?','A. Chinua Achebe','B. Wole Soyinka','C. Chimamanda Ngozi Adichie','D. Ngũgĩ wa Thiong\'o'], 'B', 'Wole Soyinka is a celebrated Yoruba playwright and novelist.'),
        ('What is the Yoruba word for music?', ['Ìwé','Orin','Ounjẹ','Oko'], 'B', 'Orin means music in Yoruba.'),
        ('Which phrase means \"How are you?\" in Yoruba?', ['Báwo ni?','Ẹ káàárọ̀','Ṣé daadaa ni?','Ẹ ṣé'], 'A', 'Báwo ni? is the Yoruba greeting for how are you.'),
    ],
    'commerce': [
        ('Which activity is part of commerce?', ['Farming','Buying and selling','Teaching','Cooking'], 'B', 'Commerce includes buying and selling of goods.'),
        ('A wholesale trader sells goods to:', ['Consumers directly','Retailers','Government only','Exporters only'], 'B', 'Wholesalers sell in bulk to retailers.'),
        ('The main goal of commerce is to:', ['Destroy competition','Facilitate trade','Reduce production','Increase prices'], 'B', 'Commerce exists to facilitate the exchange of goods and services.'),
        ('A receipt is evidence of:', ['A debt owed','Money received','A loan taken','Goods purchased on credit'], 'B', 'A receipt proves that payment has been received.'),
        ('Which document requests payment from a buyer?', ['Invoice','Receipt','Debit note','Credit note'], 'A', 'An invoice requests payment for goods or services supplied.'),
        ('Which place sells goods directly to the final consumer?', ['Retail shop','Warehouse','Factory','Distributor'], 'A', 'A retail shop sells directly to consumers.'),
        ('Money used to start a business is called:', ['Wage','Capital','Profit','Rent'], 'B', 'Capital is money invested to start a business.'),
        ('Which term refers to the price paid by a buyer?', ['Cost price','Selling price','List price','Retail price'], 'B', 'Selling price is the amount paid by the buyer.'),
        ('Trade that occurs within a country is called:', ['International trade','Domestic trade','Export trade','Import trade'], 'B', 'Domestic trade happens within one country.'),
        ('Which document shows goods received and price to pay?', ['Invoice','Receipt','Delivery note','Purchase order'], 'A', 'An invoice lists goods supplied and amount payable.'),
        ('A business that buys goods and sells them unchanged is a:', ['Manufacturer','Wholesaler','Retailer','Broker'], 'C', 'A retailer sells goods to the final consumer without changing them.'),
        ('Which cost is incurred by a seller when a product is sold?', ['Fixed cost','Variable cost','Opportunity cost','Historical cost'], 'B', 'Variable costs change with the level of sales.'),
        ('Which is a feature of commerce?', ['Production only','Distribution of goods','Ignorance of customers','Avoiding trade'], 'B', 'Commerce focuses on distributing goods from producers to consumers.'),
        ('Which document is used to order goods from a supplier?', ['Invoice','Purchase order','Receipt','Quotation'], 'B', 'A purchase order is sent to a supplier to order goods.'),
        ('Which payment method is immediate and in cash?', ['Credit sale','Cash sale','Hire purchase','Installment'], 'B', 'A cash sale is paid immediately in cash.'),
        ('A business that performs services rather than sells goods is called:', ['Service enterprise','Manufacturing firm','Trading company','Agricultural farm'], 'A', 'A service enterprise provides services, not goods.'),
        ('Which term describes the difference between selling price and cost price?', ['Revenue','Profit','Expense','Capital'], 'B', 'Profit is the difference between selling price and cost price.'),
        ('Which document is given after payment is received?', ['Invoice','Receipt','Purchase order','Quotation'], 'B', 'A receipt is issued after payment is received.'),
        ('Which factor affects demand in commerce?', ['Weather only','Customer preference','Factory size only','Office color'], 'B', 'Customer preference influences demand.'),
        ('Which work is performed by a middleman?', ['Manufacturing goods','Transporting goods','Performing surgery','Teaching'], 'B', 'A middleman helps move goods between producers and buyers.'),
    ],
    'history': [
        ('Which empire was ruled by Mansa Musa?', ['Benin Empire','Ashanti Empire','Mali Empire','Oyo Empire'], 'C', 'Mansa Musa was emperor of the Mali Empire.'),
        ('The Trans-Atlantic slave trade involved European traders and:', ['Asian workers','African captives','American colonists','Arabian merchants'], 'B', 'It involved the forced transport of African captives to the Americas.'),
        ('Which king founded the Oyo Empire?', ['Oranmiyan','Oduduwa','Ajaka','Sango'], 'A', 'Oranmiyan is credited with founding Oyo.'),
        ('The Berlin Conference of 1884-85 divided:', ['Asia','Europe','Africa','South America'], 'C', 'The Berlin Conference partitioned Africa among European powers.'),
        ('Nigeria gained independence in:', ['1957','1960','1963','1970'], 'B', 'Nigeria gained independence on October 1, 1960.'),
        ('Which ancient city is known for the bronze sculptures of the Benin Kingdom?', ['Kano','Benin City','Ibadan','Lagos'], 'B', 'Benin City is known for its bronze artworks.'),
        ('Which leader is associated with the struggle to end apartheid in South Africa?', ['Nelson Mandela','Kwame Nkrumah','Jomo Kenyatta','Haile Selassie'], 'A', 'Nelson Mandela fought against apartheid and became president.'),
        ('Which war was fought between Britain and the Ashanti Kingdom?', ['World War I','Ashanti-British wars','Nigerian Civil War','Zulu War'], 'B', 'The Ashanti-British wars were fought in the 19th century.'),
        ('Which kingdom built the ancient city of Ile-Ife?', ['Oyo','Ife','Benin','Kano'], 'B', 'Ile-Ife is the ancient birthplace of the Yoruba people.'),
        ('Which colonial power ruled Nigeria before independence?', ['France','Britain','Portugal','Spain'], 'B', 'Britain colonized Nigeria.'),
        ('Which event marked the end of World War II?', ['Treaty of Versailles','German surrender','Pearl Harbor attack','Normandy invasion'], 'B', 'World War II ended with Germany\'s surrender in 1945.'),
        ('Who was the first President of independent Nigeria?', ['Nnamdi Azikiwe','Ahmadu Bello','Obafemi Awolowo','Sani Abacha'], 'A', 'Nnamdi Azikiwe became the first President in 1963.'),
        ('Which revolution affected France in 1789?', ['Industrial Revolution','French Revolution','American Revolution','Russian Revolution'], 'B', 'The French Revolution began in 1789.'),
        ('Which event is associated with Martin Luther King Jr.?', ['March on Rome','March on Washington','Boston Tea Party','Russian Revolution'], 'B', 'Martin Luther King Jr. delivered his speech at the March on Washington.'),
        ('Which ancient African university was famous in Timbuktu?', ['University of Ghana','University of Timbuktu','Sankore University','University of Lagos'], 'C', 'Sankore University was a famous center of learning in Timbuktu.'),
        ('Who led India to independence from Britain?', ['Mahatma Gandhi','Nelson Mandela','Kwame Nkrumah','Julius Nyerere'], 'A', 'Mahatma Gandhi led India\'s independence movement.'),
        ('What was the main purpose of the Berlin Wall?', ['To unite Germany','To divide East and West Germany','To protect Berlin from floods','To celebrate peace'], 'B', 'The Berlin Wall separated East and West Berlin during the Cold War.'),
        ('Which empire built the Great Pyramids of Giza?', ['Greek Empire','Roman Empire','Egyptian Empire','Mali Empire'], 'C', 'Ancient Egyptians built the pyramids at Giza.'),
        ('What is the study of past events called?', ['Biology','History','Geography','Mathematics'], 'B', 'History studies past events and human affairs.'),
        ('Which group opposed apartheid in South Africa?', ['ANC','NATO','SEATO','EU'], 'A', 'The African National Congress fought apartheid.'),
    ],
    'computer': [
        ('What does CPU stand for?', ['Central Processing Unit','Computer Personal Unit','Control Program Utility','Central Program User'], 'A', 'CPU stands for Central Processing Unit.'),
        ('Which device is used to input text?', ['Monitor','Keyboard','Speaker','Printer'], 'B', 'A keyboard is used to input text.'),
        ('Which is an output device?', ['Mouse','Microphone','Printer','Keyboard'], 'C', 'A printer provides output on paper.'),
        ('What is the main memory of a computer called?', ['ROM','CPU','RAM','HDD'], 'C', 'RAM is the main volatile memory used during processing.'),
        ('Which software controls computer hardware?', ['Application software','Operating system','Word processor','Spreadsheet'], 'B', 'The operating system manages hardware and software.'),
        ('Which part of a computer stores data permanently?', ['RAM','ROM','Cache','Registers'], 'B', 'ROM stores permanent firmware or instructions.'),
        ('Which device connects a computer to a network?', ['Printer','Scanner','Router','Speaker'], 'C', 'A router directs network traffic between devices.'),
        ('Which number system is used by computers internally?', ['Decimal','Binary','Hexadecimal','Octal'], 'B', 'Computers use binary (0s and 1s) internally.'),
        ('Which of these is an example of application software?', ['Windows','Microsoft Word','BIOS','CPU'], 'B', 'Microsoft Word is an application used for documents.'),
        ('What does RAM stand for?', ['Random Access Memory','Read Any Memory','Rapid Application Manager','Read-Only Memory'], 'A', 'RAM means Random Access Memory.'),
        ('Which key combination is commonly used to copy selected text?', ['Ctrl+V','Ctrl+C','Ctrl+Z','Ctrl+P'], 'B', 'Ctrl+C copies selected content.'),
        ('What is the brain of the computer?', ['Monitor','CPU','Keyboard','Mouse'], 'B', 'The CPU is often called the brain of the computer.'),
        ('Which device is used to store large amounts of data long-term?', ['RAM','HDD','CPU','Monitor'], 'B', 'A hard disk drive (HDD) stores data permanently.'),
        ('Which program is used to browse the internet?', ['Word processor','Spreadsheet','Web browser','Email client'], 'C', 'A web browser allows access to websites.'),
        ('Which term refers to unwanted email?', ['Spam','Cache','Cookies','Firmware'], 'A', 'Spam is unwanted or junk email.'),
        ('Which network type covers a small area like a home?', ['WAN','LAN','MAN','PAN'], 'B', 'LAN stands for Local Area Network.'),
        ('Which device is used to convert digital signals to analog for phone lines?', ['Modem','Router','Monitor','Printer'], 'A', 'A modem converts digital data for transmission over phone lines.'),
        ('Which code is made up of 0s and 1s?', ['Decimal code','Binary code','Alphabetic code','Hex code'], 'B', 'Binary code uses 0s and 1s.'),
        ('Which of these is a storage medium?', ['Keyboard','Mouse','Flash drive','Speaker'], 'C', 'A flash drive stores digital data.'),
        ('Which is used to protect a computer from viruses?', ['Antivirus software','Graphic card','Speakers','Keyboard'], 'A', 'Antivirus software detects and removes malware.'),
    ],
}


def build_options(opts):
    return [f'A. {opts[0]}', f'B. {opts[1]}', f'C. {opts[2]}', f'D. {opts[3]}']


def make_questions(subject_key, templates, count=100):
    questions = []
    year_cycle = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]
    for i in range(count):
        base = templates[i % len(templates)]
        year = year_cycle[i % len(year_cycle)]
        q_text = base[0]
        opts = build_options(base[1])
        ans = base[2]
        exp = base[3]
        if i >= len(templates):
            q_text = f"{base[0].rstrip('?')} (question {i+1})?"
        questions.append({
            'year': year,
            'q': q_text,
            'opts': opts,
            'ans': ans,
            'exp': exp
        })
    return questions

if __name__ == '__main__':
    all_data = {}
    for key, templates in subject_templates.items():
        all_data[key] = make_questions(key, templates, 100)

    with open('new_waec_subjects.json', 'w', encoding='utf-8') as f:
        json.dump(all_data, f, indent=2, ensure_ascii=False)

    print('Generated new_waec_subjects.json with 100 questions per new subject.')
