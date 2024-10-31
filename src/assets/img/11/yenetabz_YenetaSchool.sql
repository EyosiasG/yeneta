-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 10, 2024 at 05:19 AM
-- Server version: 10.11.7-MariaDB-cll-lve
-- PHP Version: 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yenetabz_YenetaSchool`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_us`
--

CREATE TABLE `about_us` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `title_am` varchar(255) DEFAULT NULL,
  `sub_title` varchar(255) DEFAULT NULL,
  `sub_title_am` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `description_am` text DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `link_am` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `about_us`
--

INSERT INTO `about_us` (`id`, `name`, `title`, `title_am`, `sub_title`, `sub_title_am`, `description`, `description_am`, `link`, `link_am`, `created_at`, `updated_at`) VALUES
(1, 'About us', 'About us', 'ስለ እኛ', 'We Learn Smart Way To Build Bright Futute For Your Children', 'ለልጆችዎ አነጋጋሪ ወቅታዊ መንገድ በመማር ብሩህ ይሆናል', 'Welcome to Yeneta Cultural and Language Center, where the rich tapestry of Ethiopian language and culture comes alive! Nestled in the vibrant community of Silver Spring, Maryland, USA, our center is dedicated to fostering a deep appreciation and understanding of Ethiopia\'s linguistic and cultural heritage among children.\r\n\r\nAt Yeneta, we believe that language is the key to unlocking the treasures of a culture. That\'s why we offer comprehensive language programs in Geez and Amharic, two of Ethiopia\'s most significant languages. Through engaging lessons and interactive activities, our experienced instructors guide young learners on a journey of linguistic discovery, helping them develop proficiency and fluency while immersing them in the beauty of Ethiopian expression.\r\n\r\nBut our mission goes beyond language acquisition. We are committed to providing a holistic cultural education that enriches the hearts and minds of our students. Through our cultural studies program, children explore the diverse traditions, customs, music, dance, art, and history of Ethiopia, gaining a deeper understanding of the country\'s rich heritage and fostering cross-cultural appreciation.\r\n\r\nLocated in the heart of Silver Spring, our center serves as a welcoming haven where children from all backgrounds can come together to learn, grow, and connect. Our spacious and vibrant classrooms provide the perfect environment for interactive learning experiences, while our dedicated staff ensures that each child receives personalized attention and support on their educational journey.\r\n\r\nWhether your child is of Ethiopian descent, has a passion for languages and cultures, or simply wants to broaden their horizons, Yeneta Cultural and Language Center is the perfect place to embark on a transformative learning experience. Join us as we celebrate the beauty and diversity of Ethiopia\'s linguistic and cultural heritage, one lesson at a time. Welcome to Yeneta!', 'ወደ የየነታ ባህልና ቋንቋ ማህደር እንኳን ደህና መጡ፣ የኢትዮጵያን ቋንቋ እና ባህል የሚኖሩበት ሀረግ! በማርያላንድ አካባቢው ላይ የሚገኘው በሰውረስፕሪንግ ኮምዩኒቲ ውስጥ ስፍራ የያዘ ማህደራችን፣ በሕፃናት መካከል የኢትዮጵያ ቋንቋና ባህል ትምህርትን እና አክብሮትን ለመፍጠር ተቋቋመናል።\r\n\r\nበየነታ ማህደር፣ ቋንቋ በባህል ስንት ውድ መሆኑን እንወቀዋለን። ስለዚህ በጊዜና በአማርኛ ቋንቋዎች፣ የኢትዮጵያ ሁለት አስፈላጊ ቋንቋዎች የሚካሄዱ ሙሉ ቋንቋ ፕሮግራሞችን እንሰጣለን። በተሳታፊ ትምህርቶችና በመተግበሪያ ስራዎች ላይ፣ በልማት አመራሮች መንገድናቸውን ለሕፃናት ያዘጋጃሉ፣ በኢትዮጵያ ቋንቋ ማስተማር፣ እና እውቀት እንዲሆኑ እየረዳናቸው ነው።\r\n\r\nበቋንቋ ተመላላሽነት ብቻ ሳይቀር በማህደራችን ላይ ባህል ትምህርት ማቅረብ የምንቀመጥበት እንጂ አይቀርም። በባህላዊ ስልጣን ምክር፣ ልጆች የኢትዮጵያን ተለያዩ ባህልና ልማት፣ ሙዚቃ፣ እግር እና እጅ እንቅስቃሴ፣ እና ታሪክ ይህንን አገር ያላቸውን ሰላምታ እና ቅናሽ ማግኘት እንዲችሉ እና ዝርዝር ማስተዋል ይፈጥራሉ።\r\n\r\nየእኛ ማህደር በሰውረስፕሪንግ ልብ ውስጥ በመገኘት ለማስተማር ስፍራ እንዲሆን በእነ ሁሉ በአካባቢው ከተማዎች እና ልጆች በተለያዩ ቅጥሮች እንዲመጣው እንደ መኖሪያ የተከበረ ስፍራ ሆኗል። በተንኮለኛና በልዩ ካሳያ የተሞሉ ክፍሎቻችን እንደ መስተዋል ማህደር እንዲሆኑ እና የተቀነባበሩ ሰዎች ለልጆች በተማሪነት ጉዞ ላይ ማንበብና ማገዝ እንዲረዳቸው እናስተዳድራለን።\r\n\r\nልጅዎ ቢሆን ከኢትዮጵያ ወረዳ የሚመጣ፣ በቋንቋዎች እና በባህሎች ተዋንያን ወይንም አዲሱን ማየት ለማሳመን ቢፈልግ፣ የእኛ የየነታ ባህልና ቋንቋ ማህደር ተማሪነትን ለማስተናገድ እና ለመሳሰሉት የተለዋዋጭ ማስተዋል ምክንያት ሆኗል። ከእኛ ጋር እየተቀማጡ የኢትዮጵያ ቋንቋና ባህል ውበትና ልዩነት እንደአንድ ትምህርት በተቋሙ እንኳን ደህና መጡ።', 'AOn4CLAlCSeb1uIo7ViYYyg9LcsxnULybA', '4', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `author` varchar(255) NOT NULL,
  `author_am` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_am` varchar(255) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `summary_am` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `description_am` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `catagory`
--

CREATE TABLE `catagory` (
  `id` int(11) NOT NULL,
  `catagory` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `title_am` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `description_am` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `teachers` varchar(255) DEFAULT NULL,
  `teacher_am` varchar(255) DEFAULT NULL,
  `Course` varchar(255) DEFAULT NULL,
  `start_date` varchar(255) DEFAULT NULL,
  `end_date` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `P1` varchar(2550) DEFAULT NULL,
  `P2` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `title`, `title_am`, `description`, `description_am`, `price`, `teachers`, `teacher_am`, `Course`, `start_date`, `end_date`, `img_url`, `created_at`, `updated_at`, `P1`, `P2`) VALUES
(11, 'Amharic Language', 'አማርኛ ቋንቋ', 'Amharic, Ethiopia\'s official language, is a linguistic gem reflecting the country\'s rich heritage. With over 25 million speakers worldwide, it boasts ancient roots dating back to the Aksumite Empire, where it became intertwined with the religious and administrative affairs of the Ethiopian Orthodox Church. Its script, \"Fidel,\" comprising 33 basic characters, is written from left to right and has evolved over centuries. As an agglutinative language, Amharic forms words by adding prefixes, suffixes, and infixes to root words, resulting in a complex yet expressive grammar. Its vocabulary, influenced by Ge\'ez, Arabic, Hebrew, and European languages, encompasses a wide range of terms for familial relationships, social hierarchies, and cultural concepts. Beyond communication, Amharic fosters national unity, serving as a lingua franca across Ethiopia\'s diverse ethnicities, contributing to a sense of shared identity and belonging. Its cultural significance is evident in literature, with a rich tradition of poetry, prose, religious texts, and historical chronicles, penned by prominent Ethiopian literary figures. Amharic also thrives in the arts and entertainment, with music, film, and theater celebrated for their Amharic lyrics conveying themes of love, spirituality, and social justice. In contemporary society, Amharic remains vital, thriving in official contexts such as government, education, media, and official communications. Moreover, the digital era has ushered in a new chapter for Amharic, with a proliferation of online content in the language, including websites, social media, and digital publications, ensuring its continued relevance and vitality in the modern world.', 'የኢትዮጵያ ኦፊሺያል ቋንቋ የሆነው አማርኛ የአገሪቱን የበለፀገ ቅርስ የሚያንፀባርቅ የቋንቋ ዕንቁ ነው። በዓለም ዙሪያ ከ25 ሚሊዮን በላይ ተናጋሪዎች ያሏት ፣ከአክሱም ኢምፓየር ጀምሮ የጥንት ሥሮቿን ትመካለች ፣ከዚያም ከኢትዮጵያ ኦርቶዶክስ ቤተክርስቲያን ሃይማኖታዊ እና አስተዳደራዊ ጉዳዮች ጋር የተቆራኘች። “ፊደል” የተሰኘው ስክሪፕቱ 33 መሰረታዊ ገፀ-ባህሪያትን ያቀፈ፣ ከግራ ወደ ቀኝ የተፃፈ እና ለዘመናት የተሻሻለ ነው። እንደ አግግሎቲነቲቭ ቋንቋ አማርኛ ቅድመ ቅጥያዎችን፣ ቅጥያዎችን እና ቅጥያዎችን ወደ ስርወ ቃላቶች በመጨመር ቃላትን ይፈጥራል፣ ይህም ውስብስብ ግን ገላጭ ሰዋሰው ያስገኛል። በግእዝ፣ በአረብኛ፣ በዕብራይስጥ እና በአውሮፓ ቋንቋዎች ተጽዕኖ የተደረገበት የቃላት ቃላቱ ለቤተሰባዊ ግንኙነት፣ ለማህበራዊ ተዋረዶች እና ለባህላዊ ጽንሰ-ሀሳቦች ሰፊ ቃላቶችን ያጠቃልላል። \r\n\r\nከመግባቢያ ባሻገር፣አማርኛ ብሔራዊ አንድነትን ያጎለብታል፣በኢትዮጵያ የተለያዩ ብሔረሰቦች ቋንቋ ተናጋሪ ሆኖ በማገልገል፣የጋራ ማንነት እና የባለቤትነት ስሜት እንዲኖር አስተዋጽኦ ያደርጋል። ባሕላዊ ጠቀሜታው በሥነ ጽሑፍ፣ በግጥም፣ በስድ ንባብ፣ በሃይማኖታዊ ጽሑፎች እና በታሪክ ዜና መዋዕል የበለጸገ ባህል ያለው፣ በኢትዮጵያውያን ታዋቂ የሥነ ጽሑፍ ሰዎች የተፃፈ ነው። አማርኛም በኪነጥበብ እና በመዝናኛ ውስጥ ይንሰራፋል፤ በሙዚቃ፣ በፊልም እና በቲያትር በአማርኛ ግጥሞቻቸው የፍቅር፣ የመንፈሳዊነት እና የማህበራዊ ፍትህ ጭብጦችን ያስተላልፋሉ። \r\n\r\nበዘመናዊው ማህበረሰብ ውስጥ፣ አማርኛ ወሳኝ ሆኖ ይቆያል፣ እንደ መንግስት፣ ትምህርት፣ ሚዲያ እና ኦፊሴላዊ ግንኙነቶች ባሉ ኦፊሴላዊ አውዶች ውስጥ የበለፀገ ነው። ከዚህም በላይ የዲጂታል ዘመኑ ለአማርኛ አዲስ ምእራፍ አምጥቷል፣ በቋንቋው የመስመር ላይ ይዘቶች እየተበራከቱ፣ ድረ-ገጾች፣ ማህበራዊ ሚዲያ እና ዲጂታል ህትመቶችን ጨምሮ፣ በዘመናዊው ዓለም ያለውን ጠቀሜታ እና ጠቃሚነት ያረጋግጣል።', 150.00, 'Besntu Bare', 'በስንቱ በጽ', '1', '2024-05-23', '2024-05-23', 'storage/images/j485zemZcR5o4AvZWiqVOfMivF3DsySExk8iolAe.jpg', '2024-05-22 13:26:25', '2024-06-07 12:54:08', 'https://buy.stripe.com/test_28o9E5bd71mcfxC6op', 'null'),
(12, 'kirar', 'ኪራር', 'The kirar is a traditional stringed instrument from Ethiopia, similar in appearance to a small guitar or lyre. It typically consists of a wooden frame with a resonator, a flat soundboard, and six or seven strings stretched across a bridge. The strings are usually made from animal gut or nylon, and they are tuned to different pitches to create melodies and harmonies.\r\n\r\nThe kirar is widely used in Ethiopian music, both in traditional folk songs and contemporary genres. It is known for its bright and lively sound, which adds a distinctive flavor to Ethiopian music. The instrument is played by plucking the strings with the fingers or a plectrum, while the player uses their other hand to press down on the strings to change the pitch.\r\n\r\nIn Ethiopian culture, the kirar is often associated with storytelling, as it is frequently used to accompany poetic recitations and narrative songs. It is also a popular instrument for social gatherings, weddings, and other celebrations, where its cheerful melodies provide entertainment and set the mood for dancing and festivities.\r\n\r\nThe kirar holds a special place in Ethiopian music and culture, serving as a symbol of tradition, community, and artistic expression. Its versatile sound and rich history continue to inspire musicians and audiences around the world.', 'ኪራር ከትንሽ ጊታር ወይም ሊር ጋር የሚመሳሰል ከኢትዮጵያ የመጣ ባህላዊ የአውታር መሣሪያ ነው። እሱ በተለምዶ ከእንጨት የተሠራ ፍሬም ሬዞናተር ፣ ጠፍጣፋ የድምፅ ሰሌዳ እና በድልድይ ላይ የተዘረጋ ስድስት ወይም ሰባት ገመዶችን ያካትታል። ሕብረቁምፊዎቹ ብዙውን ጊዜ የሚሠሩት ከእንስሳት አንጀት ወይም ናይሎን ነው፣ እና ዜማዎችን እና ዜማዎችን ለመፍጠር በተለያዩ ቃናዎች ተስተካክለዋል።\r\n\r\nኪራር በኢትዮጵያ ሙዚቃ ውስጥ በሰፊው ጥቅም ላይ ይውላል፣ በባህላዊ ዘፈኖችም ሆነ በዘመናዊ ዘውጎች። በኢትዮጵያ ሙዚቃ ላይ ልዩ ጣዕም በሚሰጥ በደማቅ እና ሕያው ድምፁ ይታወቃል። መሳሪያው የሚጫወተው ገመዱን በጣቶቹ ወይም በፕሌክትረም በመንቀል ሲሆን ተጫዋቹ ደግሞ ሌላኛውን እጁን በመጠቀም ገመዱን በመጫን ቃናውን ለመቀየር ነው።\r\n\r\nበኢትዮጵያ ባሕል፣ ክራር ከግጥም ንባቦችና ለትረካ ዘፈኖች ጋር ተደጋግሞ ስለሚሠራ ከታሪክ አተራረክ ጋር ይያያዛል። በማህበራዊ ስብሰባዎች፣ ሰርግ እና ሌሎች ክብረ በዓላት ተወዳጅ መሳሪያ ሲሆን በውስጡም አስደሳች ዜማዎች መዝናኛዎችን የሚያቀርቡበት እና ለጭፈራ እና ለደስታ ስሜት የሚቀሰቅሱ ናቸው።\r\n\r\nኪራር በኢትዮጵያ ሙዚቃ እና ባህል ውስጥ ልዩ ቦታ አለው፣የባህል፣የማህበረሰብ እና የጥበብ መግለጫ ምልክት ሆኖ ያገለግላል። ሁለገብ ድምፁ እና የበለፀገ ታሪክ ሙዚቀኞችን እና በዓለም ዙሪያ ያሉ ታዳሚዎችን ማነሳሳቱን ቀጥሏል።', 180.00, 'Besntu Bare', '1', '4', '2024-05-10', '2024-05-17', 'storage/images/pDGaXBa9L91XgvB941L0QRC9gkR09kK1doSUpIyh.jpg', '2024-05-23 04:30:42', '2024-06-09 09:32:07', 'price_1PMYAX2K6GfB3dVvVzQ3x8yC', 'null'),
(13, 'Masinqo', 'ማሲንቆ', 'The masinqo is a traditional Ethiopian musical instrument that holds a significant place in the country’s cultural and musical heritage. It is a single-stringed bowed lute, typically constructed from wood, animal skin, and horsehair. The body of the masinko is a small, box-shaped resonator covered with animal hide, and it has a long, slender neck. The instrument is played upright, with the base resting on the performer’s knee or the ground, and sound is produced by drawing a horsehair bow across the single string, with pitch being altered by pressing the string against the neck. The masinko is used in various Ethiopian musical genres, including traditional folk, religious, and modern music, often accompanying singers and featuring in both solo and ensemble performances. Beyond its musical function, the masinko is a cultural symbol in Ethiopia, integral to celebrations, storytelling, and religious ceremonies. Despite its simple construction, it is capable of producing a wide range of sounds and emotions, showcasing the versatility and expressive potential of Ethiopian music. Renowned Ethiopian musicians have contributed to the preservation and evolution of the masinko, ensuring its continued relevance and prominence in the musical landscape.', 'ማሲንቆ በሀገሪቱ ባህላዊ እና ሙዚቃዊ ቅርስ ውስጥ ትልቅ ቦታ ያለው የኢትዮጵያ ባህላዊ የሙዚቃ መሳሪያ ነው። በተለምዶ ከእንጨት፣ ከእንስሳት ቆዳ እና ከፈረስ ፀጉር የተሰራ ባለ ነጠላ ገመድ ሉጥ ነው። የማሲንቆው አካል በእንስሳት ቆዳ የተሸፈነ ትንሽ የሳጥን ቅርጽ ያለው ሬዞናተር ነው, እና ረዥም እና ቀጭን አንገት አለው. መሳሪያው ቀጥ ብሎ ይጫወታል፣ መሰረቱ በተጫዋቹ ጉልበት ላይ ወይም መሬት ላይ ተቀምጧል፣ እና ድምጽ የሚመረተው በነጠላ ገመድ ላይ የፈረስ ፀጉር ቀስት በመሳል ሲሆን ገመዱን አንገቱ ላይ በመጫን ድምጽ ይለዋወጣል። \r\n\r\nማሲንቆ በተለያዩ የኢትዮጵያ የሙዚቃ ዘውጎች ማለትም ባህላዊ ባህላዊ፣ሀይማኖታዊ እና ዘመናዊ ሙዚቃዎች ላይ የሚውል ሲሆን ብዙ ጊዜ ዘፋኞችን የሚያጅብ እና በብቸኝነት እና በስብስብ ትርኢቶች ላይ ያቀርባል። \r\n\r\nማሲንቆ ከሙዚቃ ተግባራቱ ባሻገር በኢትዮጵያ ውስጥ የባህል ምልክት ሲሆን ከበዓላቶች፣ ተረቶች እና ሃይማኖታዊ ሥርዓቶች ጋር የተያያዘ ነው።ቀላል ግንባታ ቢኖረውም የኢትዮጵያን ሙዚቃ ሁለገብነት እና ገላጭ አቅም በማሳየት የተለያዩ ድምጾችን እና ስሜቶችን ማፍራት የሚችል ነው። ታዋቂ ኢትዮጵያውያን ሙዚቀኞች ማሲንቆን በመጠበቅ እና በዝግመተ ለውጥ በማበርከት በሙዚቃው ገጽታ ቀጣይነት ያለው ጠቀሜታ እና ታዋቂነት አረጋግጠዋል።', 180.00, 'Besntu Bare', '1', '3', '2024-05-18', '2024-05-30', 'storage/images/QRCT80WuAeSxMVAHwXLO0rygKKbqPk6fEgyX7BJk.jpg', '2024-05-23 04:32:15', '2024-06-09 09:31:34', 'https://buy.stripe.com/test_28o9E5bd71mcfxC6op', 'null'),
(14, 'Ge\'ez Language', 'የግእዝ ቋንቋ', 'Ge\'ez, also referred to as Classical Ethiopic, stands as a linguistic and cultural cornerstone in Ethiopia\'s history. Originating during the era of the Aksumite Kingdom, it flourished as a language of administration, religion, and literature, particularly during the height of the Aksumite Empire from the 1st to the 7th centuries CE. Notably, Ge\'ez became intrinsically linked with the Ethiopian Orthodox Tewahedo Church, serving as its liturgical language and remaining integral to religious ceremonies and texts. Its script, an abugida known as \"Fidel,\" shares similarities with that of Amharic, with both languages retaining rich literary traditions and religious significance. Ge\'ez\'s grammatical structure, characterized by consonantal roots and intricate patterns, and its extensive vocabulary continue to influence Ethiopian languages, particularly Amharic. Today, while Ge\'ez maintains its role in religious practices within the Ethiopian Orthodox Church, it also garners academic interest worldwide, serving as a subject of scholarly study for its insights into Ethiopian history, religion, and culture. Thus, Ge\'ez persists as a testament to Ethiopia\'s enduring cultural heritage and scholarly legacy, embodying the nation\'s deep historical roots and religious traditions.', 'ግእዝ፣ ክላሲካል ግዕዝ ተብሎም የሚጠራው፣ በኢትዮጵያ ታሪክ ውስጥ የቋንቋ እና የባህል የማዕዘን ድንጋይ ነው። የመነጨው በአክሱማዊ መንግሥት ዘመን፣ የአስተዳደር፣ የሃይማኖት እና የሥነ ጽሑፍ ቋንቋ ሆኖ ያደገ ሲሆን በተለይም በአክሱማዊ መንግሥት ከ1ኛው እስከ 7ኛው ክፍለ ዘመን ዓ.ም. በተለይም ግእዝ ከኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ጋር በቅርበት የተሳሰረ፣ ሥርዓተ ቅዳሴ ሆኖ የሚያገለግልና ከሃይማኖታዊ ሥርዓቶችና ጽሑፎች ጋር የማይገናኝ ሆነ።\r\n\r\n “ፊደል” በመባል የሚታወቀው አቡጊዳ ስክሪፕቱ ከአማርኛ ጋር ተመሳሳይነት አለው፣ ሁለቱም ቋንቋዎች የበለጸጉ የስነ-ጽሁፍ ወጎች እና ሃይማኖታዊ ጠቀሜታዎች አሉት። የግእዝ ሰዋሰዋዊ አወቃቀሩ፣ ተነባቢ ሥረ-ሥርዓተ-ሥርዓተ-ሥርዓቶችና ውስብስብ ዘይቤዎች፣ እና ሰፊ መዝገበ-ቃላቱ አሁንም በኢትዮጵያ ቋንቋዎች በተለይም በአማርኛ ላይ ተጽዕኖ ማሳደሩን ቀጥለዋል። ዛሬም ግእዝ በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ውስጥ በሃይማኖታዊ ተግባራት ውስጥ ያለውን ሚና እንደቀጠለ ቢሆንም፣ የኢትዮጵያን ታሪክ፣ ሃይማኖት እና ባህል ለመገንዘብ የጥናትና ምርምር ርዕሰ ጉዳይ በመሆን በዓለም አቀፍ ደረጃ የአካዳሚክ ፍላጎትን እያስገኘ ነው። ስለዚህም ግእዝ የኢትዮጵያን ዘላቂ የባህል ቅርስ እና ምሁራዊ ትሩፋት ማሳያ ሆኖ የቀጠለ ሲሆን ይህም የብሔረሰቡን ጥልቅ ታሪካዊ መሠረትና ሃይማኖታዊ ትውፊቶች ያቀፈ ነው።', 150.00, 'Besntu Bare1', '1', '2', '2024-05-22', '2024-05-15', 'storage/images/bUpsDzlN2qZ8t5e1zCviPcIwpCiXAdZwn8vrs1Wh.png', '2024-05-23 04:37:38', '2024-05-29 11:18:50', NULL, NULL),
(15, 'Cotton and kirosh', 'ጥጥ እና ኪሮሽ', 'Ethiopia\'s cotton production and traditional Kirosh fabric are integral to its agricultural and cultural heritage. Cotton, a crucial cash crop, supports thousands of smallholder farmers and the domestic textile industry. Grown mainly in lowland regions like Afar, Amhara, and SNNPR, Ethiopian cotton faces challenges such as inconsistent rainfall and pests but holds opportunities in organic production and increased productivity through technological investments.\r\n\r\nKirosh, made from this cotton, is a handwoven fabric known for its intricate patterns and vibrant colors, reflecting the cultural diversity of Ethiopia. It is essential in traditional clothing, such as the Habesha Kemis, and is used in special ceremonies and festivals, symbolizing cultural heritage and identity. The production of Kirosh empowers rural artisans, particularly women, and helps preserve Ethiopia\'s weaving traditions, promoting them both locally and globally. Together, cotton and Kirosh underscore the importance of agriculture and cultural preservation in Ethiopia\'s economy and identity, bridging the past with the present and ensuring a vibrant future for generations to come.', 'የኢትዮጵያ የጥጥ ምርትና ባህላዊ የኪሮሽ ጨርቃጨርቅ የግብርናና የባህል ቅርሶቿ ናቸው። ጥጥ፣ ወሳኝ የገንዘብ ሰብል፣ በሺዎች የሚቆጠሩ አነስተኛ ገበሬዎችን እና የአገር ውስጥ የጨርቃጨርቅ ኢንዱስትሪን ይደግፋል። በዋናነት በቆላማ አካባቢዎች እንደ አፋር፣ አማራ እና ደቡብ ክልሎች የሚበቅለው የኢትዮጵያ ጥጥ እንደ ያልተረጋጋ ዝናብ እና ተባዮች ያሉ ተግዳሮቶች ያጋጥሟቸዋል፣ነገር ግን በኦርጋኒክ ምርት ውስጥ እድሎችን እና በቴክኖሎጂ ኢንቨስትመንቶች ምርታማነትን ይጨምራል።\r\n\r\nከዚህ ጥጥ የተሰራው ኪሮሽ በእጅ የተሸመነ ጨርቃጨርቅ በተወሳሰቡ የአሰራር ዘይቤው እና በቀለማት ያሸበረቀ ቀለም ያለው ሲሆን ይህም የኢትዮጵያን የባህል ብዝሃነት ያሳያል። እንደ ሀበሻ ከሚስ በመሳሰሉት የባህል አልባሳት ላይ አስፈላጊ ሲሆን በልዩ ሥነ ሥርዓቶች እና በዓላት ላይ የባህል ቅርስ እና የማንነት መገለጫ ነው። የኪሮሽ ምርት የገጠር የእጅ ጥበብ ባለሙያዎችን በተለይም ሴቶችን የሚያበረታታ ሲሆን የኢትዮጵያን የሽመና ባህሎች በአገር ውስጥም ሆነ በዓለም አቀፍ ደረጃ በማስተዋወቅ ረገድ ያግዛል። ጥጥ እና ኪሮሽ በጋራ በመሆን ግብርና እና ባህልን መጠበቅ በኢትዮጵያ ኢኮኖሚ እና ማንነት ላይ ያለውን ጠቀሜታ በማሳየት ያለፈውን ከአሁኑ ጋር በማገናኘት ለቀጣይ ትውልድ ብሩህ ተስፋ ይሰጣል።', 200.00, 'Besntu Bare1', '1', '5', '2024-05-24', '2024-06-05', 'storage/images/muQApVhL4uagJOrTGbmKluKvAtQiMyW1HcUoOHpb.png', '2024-05-23 04:39:33', '2024-05-29 11:25:02', NULL, NULL),
(17, 'Special class', 'Special class', 'We Yeneta Language and Cultural Academy are excited to offer a special class designed for individuals seeking an advanced and immersive learning experience. This unique opportunity is available through an exclusive enrollment process which includes a detailed application, a comprehensive vetting by our expert panel, and a personal interview. After registration we will contact you with further details.', 'We Yeneta Language and Cultural Academy are excited to offer a special class designed for individuals seeking an advanced and immersive learning experience. This unique opportunity is available through an exclusive enrollment process which includes a detailed application, a comprehensive vetting by our expert panel, and a personal interview. After registration we will contact you with further details.', 200.00, 'abebe kebede', 'ከበደ አበበ', '1', '2024-05-26', '2024-06-08', 'storage/images/6IF19hty2Dcz1Y6vwKPfNsfZ6ypLCNoLwAPTvHRj.jpg', '2024-05-30 14:08:34', '2024-06-09 09:32:48', 'price_1PMYAX2K6GfB3dVvVzQ3x8yC', 'price_1PNfk82K6GfB3dVvfNvUpEsQ');

-- --------------------------------------------------------

--
-- Table structure for table `comp`
--

CREATE TABLE `comp` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `Student_name` varchar(255) DEFAULT NULL,
  `Student_id` int(11) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Issue_date` date DEFAULT NULL,
  `Payment_type` varchar(50) DEFAULT NULL,
  `Amount` decimal(10,2) DEFAULT NULL,
  `Tx_id` varchar(100) DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sub_title` varchar(255) DEFAULT NULL,
  `sub_title_am` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `address_am` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`id`, `sub_title`, `sub_title_am`, `address`, `address_am`, `email`, `phone`, `created_at`, `updated_at`) VALUES
(1, 'Contact us any time', 'Contact us any time', 'Maryland, Silver Spring 20903, United States', 'Maryland, Silver Spring 20903, United States', 'info@yenetaschool.com', '+12403748205', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `title_am` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `description_am` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `location_am` varchar(255) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `date` date DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `title_am`, `description`, `description_am`, `location`, `location_am`, `time`, `date`, `image`, `created_at`, `updated_at`) VALUES
(11, '🌍🌱 Celebrate Earth Day with Us! 🌱🌍', '🌍🌱 Celebrate Earth Day with Us! 🌱🌍', 'Join us at Yeneta Language and Cultural Academy for a special Earth Day event! Participate in a community clean-up, educational workshops, nature walks, tree planting, and eco-friendly art projects. Let\'s come together to protect our planet! Admission is free. Don\'t miss out! 🌿🌎', 'Join us at Yeneta Language and Cultural Academy for a special Earth Day event! Participate in a community clean-up, educational workshops, nature walks, tree planting, and eco-friendly art projects. Let\'s come together to protect our planet! Admission is free. Don\'t miss out! 🌿🌎', 'Maryland', 'Maryland', '01:34:00', '2024-05-16', 'storage/images/qAlsfQvsysIDoCCtQRLCPqc5zLffVOmNSJXZRO9E.jpg', '2024-05-25 16:35:00', '2024-05-25 16:35:00'),
(12, '🎉 Join Us for Color Day at Yeneta Language and Cultural Academy! 🎉', '🎉 Join Us for Color Day at Yeneta Language and Cultural Academy! 🎉', 'Celebrate the beauty of diversity with us at Yeneta Language and Cultural Academy\'s Color Day event! Enjoy cultural showcases, a Holi-inspired color throw, artistic activities, workshops, and delicious cuisine from around the world. Dress in your most vibrant attire and join the fun! Admission is free. Don\'t miss out on this colorful celebration! 🎨🌍', 'Celebrate the beauty of diversity with us at Yeneta Language and Cultural Academy\'s Color Day event! Enjoy cultural showcases, a Holi-inspired color throw, artistic activities, workshops, and delicious cuisine from around the world. Dress in your most vibrant attire and join the fun! Admission is free. Don\'t miss out on this colorful celebration! 🎨🌍', 'Maryland', 'Maryland', '00:36:00', '2024-05-21', 'storage/images/JMRdNEAaZT2B5fRAraRt24q2ERjfBmnsqkSIYCw2.jpg', '2024-05-25 16:36:59', '2024-05-25 16:36:59'),
(13, '🇪🇹✨ Experience Ethiopian Culture! ✨🇪🇹', '🇪🇹✨ Experience Ethiopian Culture! ✨🇪🇹', 'Join us at Yeneta Language and Cultural Academy for an Ethiopian Cultural Show! Enjoy traditional music, colorful dances, cultural exhibits, and delicious cuisine. Admission is open to all. Come celebrate Ethiopia with us! 🎶🌟', 'Join us at Yeneta Language and Cultural Academy for an Ethiopian Cultural Show! Enjoy traditional music, colorful dances, cultural exhibits, and delicious cuisine. Admission is open to all. Come celebrate Ethiopia with us! 🎶🌟', 'Maryland', 'Maryland', '22:39:00', '2024-05-30', 'storage/images/NDI5uN74VnmAhSCVRgQunKDeX9W9SpATJntQieph.jpg', '2024-05-25 16:38:03', '2024-05-25 16:38:56'),
(14, '🚌🌟 Field Trip Day at Yeneta Language and Cultural Academy! 🌟🚌', '🚌🌟 Field Trip Day at Yeneta Language and Cultural Academy! 🌟🚌', 'Get ready for an exciting adventure! Join us for Field Trip Day at Yeneta Language and Cultural Academy. Explore new places, learn, and have fun with friends. Don\'t miss out on this unforgettable experience! 🌍🎒', 'Get ready for an exciting adventure! Join us for Field Trip Day at Yeneta Language and Cultural Academy. Explore new places, learn, and have fun with friends. Don\'t miss out on this unforgettable experience! 🌍🎒', 'Maryland', 'Maryland', '00:38:00', '2024-05-30', 'storage/images/RMfsDUhopSJop2tqdc7RxhT32VFiffP8MMHCY7S9.jpg', '2024-05-25 16:38:40', '2024-05-25 16:38:40'),
(15, 'abeb', '1', 'wevwes', '1', '11qwd', 'wnvg sjev', '17:38:00', '2024-06-17', 'storage/images/cG18t3jnQFk1wExhnhsHIr4kaZWx2ULjc3jgO3H4.jpg', '2024-06-06 08:33:25', '2024-06-06 08:33:25');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `description_am` text DEFAULT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `group_name_am` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `category_am` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `img_url`, `title`, `description`, `description_am`, `group_name`, `group_name_am`, `category`, `category_am`, `created_at`, `updated_at`) VALUES
(16, 'storage/images/hTJenxpzPWpzRGJZBLyEDPIF6dA3AU3N7JN6wRZi.jpg', '1dads', 'daedaedaed', 'daedaedaed', 'Gallery', NULL, 'ceremony', '1', '2024-05-22 08:04:20', '2024-05-22 08:04:20'),
(17, 'storage/images/Kk2pQQeiKvsrqJUgNhbH4JNMEfZBtbIIntmZi64G.jpg', '11', '1', '1', 'Gallery', NULL, 'ceremony', 'd', '2024-05-22 08:20:55', '2024-05-22 08:20:55'),
(18, 'storage/images/XaJApwjJHsx53jdreZHKltk21HB8v0dHuk2Uo3JV.jpg', '11', 'dcac', 'efqfqef', 'Video', NULL, 'ceremony', 'wefwefw', '2024-05-22 08:21:26', '2024-05-22 08:21:26'),
(19, 'storage/images/VJsxrw7bFeR55Zx1LDFB7xRLz3PXwZcioDsBoxRk.jpg', '11', 'vsdad', 'avaedvfadfe', 'Gallery', NULL, 'graduation(2022)', 'dvadcv', '2024-05-22 08:22:37', '2024-05-22 08:22:37'),
(20, 'storage/images/7yY8XUsQDQwIckbXpBdZuVcSd279P1KFfcFzUjMA.jpg', '11', 'caadcaca', 'adcadca', 'Gallery', NULL, 'graduation(2022)', 'dvadcv', '2024-05-22 08:22:57', '2024-05-22 08:22:57'),
(21, 'storage/images/ev6eEsWlsRZfddwb8FJ5Xs8e9p50vEcOvd64cOZC.jpg', '11', 'vadvavdavdac', 'svsdvadvadvv', 'Gallery', NULL, 'graduation(2022)', 'dvadcv', '2024-05-22 08:23:17', '2024-05-22 08:23:17'),
(22, 'storage/images/rxZGjYUW6OxKnKcPku6oqRohvqihDbq2gQTJKRED.jpg', '11', 'sdvsdvsv', 'svsvsfv', 'Gallery', NULL, 'graduation(2022)', 'dvadcv', '2024-05-22 08:23:50', '2024-05-22 08:23:50'),
(24, 'storage/images/lLuz43ROugy6LQvH2W5VOsgjIjaE0I6s0YejOv0v.jpg', 'abeb', 'ascalksca', 'cajdcajncalc lajc', 'Video', NULL, 'video', '1', '2024-06-07 06:04:20', '2024-06-07 06:04:20');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoiceId` varchar(255) DEFAULT NULL,
  `Student_name` varchar(255) DEFAULT NULL,
  `Student_id` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `Issue_date` date DEFAULT NULL,
  `Paymenttype` varchar(255) DEFAULT NULL,
  `Amount` decimal(10,2) DEFAULT NULL,
  `Tx_id` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `invoiceId`, `Student_name`, `Student_id`, `Email`, `Phone`, `Issue_date`, `Paymenttype`, `Amount`, `Tx_id`, `status`, `created_at`, `updated_at`) VALUES
(11, 'inv_66525e15129a4', 'sat33', 'YE0CCD061D', 'yeneabtewelde@gmail.com', '0987654321', '2024-05-10', 'Cash', 435.00, 'wemfopwkl2q', '`1', '2024-05-25 18:54:29', '2024-05-25 18:54:29'),
(12, 'inv_6661bcb5228ce', 'sat', '21332r34124', 'yeneabtewelde@gmail.com', '0987654321', '2024-06-12', 'Credit Card', 22023.00, 'wemfopwkl2q', 'dvwdvWEVerv', '2024-06-06 10:42:13', '2024-06-06 10:42:13'),
(13, 'inv_6662fb5c6ee2c', 'sat', '21332r34124', 'yeneabtewelde@gmail.com', '0987654321', '2024-06-14', 'Bank Transfer', 880.00, 'wemfopwkl2q', 'dvwdvWEVerv', '2024-06-07 09:21:48', '2024-06-07 09:21:48');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `maintitle`
--

CREATE TABLE `maintitle` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subTitle` varchar(255) NOT NULL,
  `title_am` varchar(255) NOT NULL,
  `subTitle_am` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `maintitle`
--

INSERT INTO `maintitle` (`id`, `name`, `title`, `subTitle`, `title_am`, `subTitle_am`, `created_at`, `updated_at`) VALUES
(1, 'Aboutus', 'About Us', 'We Learn Smart Way To Build Bright Futute For Your Children', 'ስለ እኛ', 'ለልጆችዎ አነጋጋሪ ወቅታዊ መንገድ በመማር ብሩህ ይሆናል', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `contact`, `name`, `email`, `message`, `created_at`, `updated_at`) VALUES
(26, NULL, 'Rakeb Zeleke', 'rakebgirum911@gmail.com', 'Hello', '2024-05-25 17:46:21', '2024-05-25 17:46:21'),
(27, NULL, 'Rakeb Zeleke', 'rakebgirum911@gmail.com', 'Hello', '2024-05-25 17:46:25', '2024-05-25 17:46:25');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(87, '2024_04_12_025658_add_am_columns_to_testimonials_table', 4),
(205, '2014_10_12_000000_create_users_table', 5),
(206, '2014_10_12_100000_create_password_resets_table', 5),
(207, '2019_05_03_000001_create_customer_columns', 5),
(208, '2019_05_03_000002_create_subscriptions_table', 5),
(209, '2019_05_03_000003_create_subscription_items_table', 5),
(210, '2019_08_19_000000_create_failed_jobs_table', 5),
(211, '2019_12_14_000001_create_personal_access_tokens_table', 5),
(212, '2024_03_30_112051_create_about_us_table', 5),
(213, '2024_03_30_112052_create_services_table', 5),
(214, '2024_03_30_112053_create_contact_us_table', 5),
(215, '2024_03_30_112054_create_gallery_table', 5),
(216, '2024_03_30_112054_create_why_table', 5),
(217, '2024_03_30_112055_create_testimonials_table', 5),
(218, '2024_03_30_112056_create_messages_table', 5),
(219, '2024_03_30_112057_create_classes_table', 5),
(220, '2024_03_30_112057_create_comp_table', 5),
(221, '2024_03_30_112058_create_events_table', 5),
(222, '2024_03_30_112059_create_blogs_table', 5),
(223, '2024_03_30_112059_create_staff_table', 5),
(224, '2024_03_30_112100_create_subclasses_table', 5),
(225, '2024_03_30_112101_create_students_table', 5),
(226, '2024_03_30_112102_create_registeredstudent_table', 5),
(227, '2024_03_30_112226_create_maintitle_table', 5),
(228, '2024_04_01_045756_add_expires_at_column_to_personal_access_tokens_table', 5),
(229, '2024_04_12_114120_update_registered_students_table', 5),
(230, '2024_04_12_115154_update_students_table', 5),
(231, '2024_04_12_115244_update_classes_table', 5),
(232, '2024_04_13_072831_create_partners_table', 5),
(233, '2024_04_26_065511_create_invoices_table', 6),
(234, '2024_04_27_130530_create_students_table', 7),
(235, '2024_05_03_111312_create_products_table', 8),
(236, '2024_05_03_140434_create_orders_table', 9),
(237, '2024_06_06_084509_create_jobs_table', 10);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address1` varchar(255) NOT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zipcode` varchar(255) NOT NULL,
  `deliveryStatus` varchar(255) NOT NULL,
  `orderNo` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(8255) DEFAULT NULL,
  `price` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `first_name`, `last_name`, `email`, `phone`, `address1`, `address2`, `city`, `state`, `zipcode`, `deliveryStatus`, `orderNo`, `created_at`, `updated_at`, `name`, `price`) VALUES
(116, 'Girum', 'Girum', 'girumgir@gmail.com', '0987654321', 'Maryland', 'Dallas', 'dallas', 'Texas', '1332313', 'Delivered', 'ORD4A11A4AA', '2024-05-25 18:29:02', '2024-05-25 18:44:32', '1. NootBook . . Qty: 2\n2. Amharic Alphabet . . Qty: 1', 558.00),
(117, 'ye', 'neta', 'dagijossy19@gmail.com', '0987654321', '1', '1', '1', '1', '1', 'Pending', 'ORD47CEC405', '2024-06-03 14:46:22', '2024-06-03 14:48:45', '1. Amharic Alphabet . . Qty: 9\n2. Flashcard . . Qty: 5', 3433.00),
(118, 'fqeflqef', 'deffq', 'vijopo8415@artgulin.com', '0987654321', 'addis', '1', '1', '1', '14432', 'Unpaid', 'ORD5D68DF88', '2024-06-07 09:28:29', '2024-06-07 09:28:29', '1. Flashcard . . Qty: 6\n2. NootBook . . Qty: 2', 996.00),
(119, 'fqeflqef', 'deffq', 'vijopo8415@artgulin.com', '0987654321', 'addis', '1', '1', '1', '14432', 'Unpaid', 'ORD59573190', '2024-06-09 10:44:17', '2024-06-09 10:44:17', '1. fqeflqef add deffq . . Qty: 3\n2. NootBook . . Qty: 4', 23550.00);

-- --------------------------------------------------------

--
-- Table structure for table `partner`
--

CREATE TABLE `partner` (
  `id` int(11) NOT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `partner`
--

INSERT INTO `partner` (`id`, `companyName`, `status`, `email`, `phone`, `message`, `created_at`, `updated_at`) VALUES
(1111134, 'ABC', '0', 'rakebgirum911@gmail.com', '0987654321', 'Hello', '2024-05-25 17:48:45', '2024-05-25 17:48:45');

-- --------------------------------------------------------

--
-- Table structure for table `partners`
--

CREATE TABLE `partners` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `expires_at`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'API TOKEN', 'b827c7b514de284869142ff3d2fe804389418c6ae3a34e07d3847f0acfe8e719', '[\"*\"]', NULL, NULL, '2024-04-28 12:14:44', '2024-04-28 12:14:44'),
(2, 'App\\Models\\User', 1, 'API TOKEN', '19cfc95c64efe617d7a2a56fde3903d4c601d7a5a4c14fc10d1305e25715c28c', '[\"*\"]', NULL, NULL, '2024-04-28 12:14:52', '2024-04-28 12:14:52'),
(3, 'App\\Models\\User', 1, 'API TOKEN', '3d5948832b4fcccb72ceecb4a2909fb03af613d821c086bb1b6be7006c285803', '[\"*\"]', NULL, NULL, '2024-04-28 12:14:52', '2024-04-28 12:14:52'),
(4, 'App\\Models\\User', 1, 'API TOKEN', '998f73e6d21e9f1858560e60c361d64f172909489745ca47c54f5850ba6c7530', '[\"*\"]', NULL, NULL, '2024-04-28 12:18:06', '2024-04-28 12:18:06'),
(5, 'App\\Models\\User', 1, 'API TOKEN', 'ba7e64355b7934ebba8a5181cea5fbfe1e4507ee4ac26fc201cf11bcf2c15445', '[\"*\"]', NULL, NULL, '2024-04-28 12:24:15', '2024-04-28 12:24:15'),
(6, 'App\\Models\\User', 1, 'API TOKEN', '1ca1d88356dae146c6415ee41e8a153beeee52319d53f4dbf7f125daf235836d', '[\"*\"]', NULL, NULL, '2024-04-28 12:25:58', '2024-04-28 12:25:58'),
(7, 'App\\Models\\User', 1, 'API TOKEN', '43ec87b2ac55c10766f92d8258032fda2d6c1be5c36f5825453dab5c7ae4beab', '[\"*\"]', NULL, NULL, '2024-04-28 12:26:08', '2024-04-28 12:26:08'),
(8, 'App\\Models\\User', 1, 'API TOKEN', '42cb077080c3ac8b842e4fc0be9e4e5d6b3fd2c7f6cf5bf4e6ec4343dd962a7f', '[\"*\"]', NULL, NULL, '2024-04-28 12:26:11', '2024-04-28 12:26:11'),
(9, 'App\\Models\\User', 1, 'API TOKEN', 'd787805f2ac577dfa52171f282193cb2081f795d2e0e254d63b34b8805587299', '[\"*\"]', NULL, NULL, '2024-04-28 12:26:25', '2024-04-28 12:26:25'),
(10, 'App\\Models\\User', 1, 'API TOKEN', '8965787f81016370f735d713fa8207951aeefa1c9ff5ca2c2a8a97b4d42347bc', '[\"*\"]', NULL, NULL, '2024-04-28 12:27:06', '2024-04-28 12:27:06'),
(11, 'App\\Models\\User', 1, 'API TOKEN', 'c1f5f1e9a1211fc1d70c25a83fb443370e19506262237c61305b5a418eb00dd6', '[\"*\"]', NULL, NULL, '2024-04-28 12:27:12', '2024-04-28 12:27:12'),
(12, 'App\\Models\\User', 1, 'API TOKEN', 'f72d0ffe1ae9d11741f3bda6bdcab5b7dd2543e6f6966b5b0d07d46e3c55bcbf', '[\"*\"]', NULL, NULL, '2024-04-28 12:28:21', '2024-04-28 12:28:21'),
(13, 'App\\Models\\User', 1, 'API TOKEN', 'eab8b3aaaa404c5062b80ffef941cc190614f1521db6fbcf527a0f392faa0dec', '[\"*\"]', NULL, NULL, '2024-04-28 12:28:35', '2024-04-28 12:28:35'),
(14, 'App\\Models\\User', 1, 'API TOKEN', '933437717575dcf69b2f2832f98f4afdc5904275bac7808eaf40b7e767348f1a', '[\"*\"]', NULL, NULL, '2024-04-28 12:28:43', '2024-04-28 12:28:43'),
(15, 'App\\Models\\User', 1, 'API TOKEN', 'fbca8e3f85f5b65dc8d26854dc0c415f8add5328df0a2b642627ca9c0b882052', '[\"*\"]', NULL, NULL, '2024-04-28 12:32:31', '2024-04-28 12:32:31'),
(16, 'App\\Models\\User', 1, 'API TOKEN', '4fbc306219afbef6062d65fe3b874d4c6dc31b674c3edfe796e6c1543feeeaee', '[\"*\"]', NULL, NULL, '2024-04-28 12:32:35', '2024-04-28 12:32:35'),
(17, 'App\\Models\\User', 1, 'API TOKEN', 'dc796909203423f93824d233c893e84932a6e4eadd6858c15947d7b75b23572c', '[\"*\"]', NULL, NULL, '2024-04-28 12:34:10', '2024-04-28 12:34:10'),
(18, 'App\\Models\\User', 1, 'API TOKEN', '9ea4b09c8aff9091bda277a2bd71be753c8d51cf7c753ce75ae2cb96c368edd1', '[\"*\"]', NULL, NULL, '2024-04-28 12:36:33', '2024-04-28 12:36:33'),
(19, 'App\\Models\\User', 1, 'API TOKEN', 'fc22b8f9b970c3c12eaa1b4dc97ecfc0544859a44902eefe06c08606088d0b1d', '[\"*\"]', NULL, NULL, '2024-04-28 12:38:32', '2024-04-28 12:38:32'),
(20, 'App\\Models\\User', 1, 'API TOKEN', '1c3be852661ca3414351f549e4115559a26fc1294ce12db8bffa716015a6aa58', '[\"*\"]', NULL, NULL, '2024-04-28 12:38:46', '2024-04-28 12:38:46'),
(21, 'App\\Models\\User', 1, 'API TOKEN', 'a95fd165bc3ab1cc5e44b60ba216e28a22800e0f86fbf77e29cd74258f53184a', '[\"*\"]', NULL, NULL, '2024-04-28 12:43:42', '2024-04-28 12:43:42'),
(22, 'App\\Models\\User', 1, 'API TOKEN', 'dfb329b09986028d4ba8ca673b7ab5424aef23e117d2244c4c9085be5eed37c8', '[\"*\"]', NULL, NULL, '2024-04-28 12:55:51', '2024-04-28 12:55:51'),
(23, 'App\\Models\\User', 1, 'API TOKEN', '33784e2ea364eb161d21f1b7417873e5fb9255d446ea8891ea313c2d962ecd30', '[\"*\"]', NULL, NULL, '2024-04-28 12:56:38', '2024-04-28 12:56:38'),
(24, 'App\\Models\\User', 1, 'API TOKEN', 'da5330ce31ba0610d1ea442c38f55795ad6aeb3c78ec6e258dc4e44065b8e881', '[\"*\"]', NULL, NULL, '2024-04-29 12:18:07', '2024-04-29 12:18:07'),
(25, 'App\\Models\\User', 1, 'API TOKEN', '9785d965d6949671e480d88142219fb9b42026d87c4b40f4c147758f2bdb109b', '[\"*\"]', NULL, NULL, '2024-04-29 12:18:11', '2024-04-29 12:18:11'),
(26, 'App\\Models\\User', 1, 'API TOKEN', 'fe5f12948ada352a4adcf9c369dd1ecca296a40549314b15a59d6738c35ffdda', '[\"*\"]', NULL, NULL, '2024-04-29 12:18:51', '2024-04-29 12:18:51'),
(27, 'App\\Models\\User', 1, 'API TOKEN', 'b07d4e05e00c7c3f6d258473b95a9b8038588fdc8e98809207ac69aa9445f945', '[\"*\"]', NULL, NULL, '2024-04-30 16:10:07', '2024-04-30 16:10:07'),
(28, 'App\\Models\\User', 1, 'API TOKEN', '77c968bc6fd24410c3fb9acd58630447c44b54477c2fc05d827f6bc90c13873b', '[\"*\"]', NULL, NULL, '2024-05-05 06:23:11', '2024-05-05 06:23:11'),
(29, 'App\\Models\\User', 1, 'API TOKEN', 'f5c7899d6e19917464cf4e3e021e792981bcd0dbf0d9470877b2ce606ae7796d', '[\"*\"]', NULL, NULL, '2024-05-05 06:30:05', '2024-05-05 06:30:05'),
(30, 'App\\Models\\User', 1, 'API TOKEN', 'b922dd606c0b52c5385f16b697a394728e56235b5baec4e84070ce41868bf862', '[\"*\"]', NULL, NULL, '2024-05-17 04:48:23', '2024-05-17 04:48:23'),
(31, 'App\\Models\\User', 1, 'API TOKEN', '6cb353a6645caa20a3c0a7bbd1f052d83c2df952de44a9dfa676f597ef255b7b', '[\"*\"]', NULL, NULL, '2024-05-17 04:48:23', '2024-05-17 04:48:23'),
(32, 'App\\Models\\User', 1, 'API TOKEN', '6b96fc2f3839035f55d05bff1a9464fa858dbaee2519dfae5582135ab7299527', '[\"*\"]', NULL, NULL, '2024-05-21 06:25:39', '2024-05-21 06:25:39'),
(33, 'App\\Models\\User', 1, 'API TOKEN', '85e381c485f0aa00c8288e177acd6603b6e6e8f9317cedde45c96729db30b588', '[\"*\"]', NULL, NULL, '2024-05-21 10:45:21', '2024-05-21 10:45:21'),
(34, 'App\\Models\\User', 1, 'API TOKEN', '8e3961818cfc300b9059158071266da541007441925178afaec5df01522d39bd', '[\"*\"]', NULL, NULL, '2024-05-21 10:45:33', '2024-05-21 10:45:33'),
(35, 'App\\Models\\User', 1, 'API TOKEN', '5b82c17fc31a2dab2d27a5f9c914e4cb8b78a16c71c042447e0aab8442088585', '[\"*\"]', NULL, NULL, '2024-05-21 10:45:37', '2024-05-21 10:45:37'),
(36, 'App\\Models\\User', 1, 'API TOKEN', '68b3e27d3252fb04b888417cdacfa2e16d858af89b344056e0928642bcd14ea8', '[\"*\"]', NULL, NULL, '2024-05-21 10:45:46', '2024-05-21 10:45:46'),
(37, 'App\\Models\\User', 1, 'API TOKEN', 'c6713965c22c162f22e95a34f9dba0afcf9f16c84f27fd001f34707452609582', '[\"*\"]', NULL, NULL, '2024-05-21 10:46:19', '2024-05-21 10:46:19'),
(38, 'App\\Models\\User', 1, 'API TOKEN', 'd0d41745046d9cb2606c1f22a71d78eadaf5692aedd2ce78fdc131f1ab18cf15', '[\"*\"]', NULL, NULL, '2024-05-21 10:46:45', '2024-05-21 10:46:45'),
(39, 'App\\Models\\User', 1, 'API TOKEN', 'bd1e18c0cdcac9c63cb2fc47faa9ba9959263e1671f755bb316400d29fb44c5d', '[\"*\"]', NULL, NULL, '2024-05-21 10:47:54', '2024-05-21 10:47:54'),
(40, 'App\\Models\\User', 1, 'API TOKEN', 'b4067245cffa7505df7b5265fd432f33d0348710333d140ceff5671131c9091f', '[\"*\"]', NULL, NULL, '2024-05-22 07:35:15', '2024-05-22 07:35:15'),
(41, 'App\\Models\\User', 1, 'API TOKEN', '07a688c7fdc18f60d6f1c28ae6afd6ceb045874356106137935a8b4a1419749a', '[\"*\"]', NULL, NULL, '2024-05-22 11:37:21', '2024-05-22 11:37:21'),
(42, 'App\\Models\\User', 1, 'API TOKEN', '67e50442d72f058bcfc86ffa0d8d535b1db4daac2fd21b675f2c8d96b7f8867d', '[\"*\"]', NULL, NULL, '2024-05-25 17:38:50', '2024-05-25 17:38:50'),
(43, 'App\\Models\\User', 1, 'API TOKEN', '4c2ae9e18d8ef512f55be0d1ec61f56fb0caabcdf6c0559742dd4f22d6c85ba5', '[\"*\"]', NULL, NULL, '2024-06-09 21:18:51', '2024-06-09 21:18:51'),
(44, 'App\\Models\\User', 1, 'API TOKEN', '0a45ddd89e2fa7bc4b3f0ebafb2db492b9c7ddc5006df3e086dd551e188cc820', '[\"*\"]', NULL, NULL, '2024-06-09 21:19:07', '2024-06-09 21:19:07'),
(45, 'App\\Models\\User', 1, 'API TOKEN', '842c82a4fcebd2a723ec5f80611b69d4b26c67b2ab51482e590e0ca6703e8c72', '[\"*\"]', NULL, NULL, '2024-06-09 21:19:24', '2024-06-09 21:19:24'),
(46, 'App\\Models\\User', 1, 'API TOKEN', 'e899f5511e9bb2f6fe9fd2eeaa993c47ac24b17f0e7502c8c3ee41328a4a9a09', '[\"*\"]', NULL, NULL, '2024-06-09 21:19:40', '2024-06-09 21:19:40'),
(47, 'App\\Models\\User', 1, 'API TOKEN', '4bd6cef8bf28cd3fd349e27306356654d3cabbfea365347a7d2b316b01c41a06', '[\"*\"]', NULL, NULL, '2024-06-09 21:33:08', '2024-06-09 21:33:08');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `video`, `created_at`, `updated_at`) VALUES
(13, 'Puzzle', 'qwertyui uyterwertyuiytrewqssertgyuiko ewe gwefweg wrfdrftgybuioiymutnybrtvecrwexq wqxecrvtbynu  gwg fefwrfwr wrgvmwrgf,wrgwrg wr;gwr,g w;r,row gwrgwrg\r\n ebgegm7itnbrvecwxqxqwcewvrgtwgflwegl;weg rgwg yuyimtunybrtvecwxsdcf vsfvrvwrvwr wg wrgwr gwrg wrgwgwggthyjukm,myuntybtrvecwxdcfevgrbthnyumitunyrbtevcdw', 332.00, 'storage/images/myCFrMASDZF2ZSuf4yC0q6pndC74CC88Qr9LBZIc.jpg', 'zRdhoYqCAQg', '2024-05-22 11:39:53', '2024-05-22 11:39:53'),
(14, 'Ethiopian Fasiledes Wooden Jigsaw Puzzle', 'Puzzle for kids aged 3 years and older. This 36 pieces colorful wooden puzzle for toddler children learning one of the most historical castles in Ethiopia. This puzzle made to be attractive and fun for children to play and learn about Ethiopian historical place the same time.', 25.00, 'storage/images/fz1QSrCy6PJIiTATDbb5k9mkLEl31v4mGbq7Hf8L.jpg', 'nbmJnCHXaW8', '2024-05-23 05:48:52', '2024-06-09 21:33:42'),
(15, 'Ethiopian Lalibela Wooden Jigsaw Puzzle', 'Ethiopian Lalibela wooden jigsaw puzzles for kids ages 3 years and older by Mnhar. Ethiopian Lalibela wooden educational puzzle for boys and girls. It is easy to assemble and fun to play. It is 35 pieces.', 25.99, 'storage/images/vTqSFhU7o5Qa5owyYm3RkEyPP7KdbE5zk1Am6qeX.jpg', 'nbmJnCHXaW8', '2024-05-23 14:00:06', '2024-06-09 20:39:53'),
(16, 'Ten Animals only found in Ethiopia Wooden Jigsaw Puzzle', 'Ten Animals that can be only be found in Ethiopia wooden jigsaw puzzles for kids ages 12M+ and older by Mnhar. This wooden educational puzzle for boys and girls. It is easy to assemble and fun to play. It is 10 pieces.', 25.99, 'storage/images/MZloTdLXTgxg7xkSJWg1DIUSu1LEWtfEwvdLt6G3.jpg', 'nbmJnCHXaW8', '2024-05-25 18:22:56', '2024-06-09 20:38:32'),
(17, 'Ethiopian | Eritrean | Habesha | Amharic Ha Hu Fidel | Ge\'ez Fidel | የአማርኛ ፊደላት | Wooden Jigsaw Puzzle for Toddlers & Kids', '1This Amharic Fidel wooden jigsaw puzzle is a fun and educational toy designed for children aged 12 months and older. Made by Mnhar, this wooden puzzle features 33 pieces that are easy to assemble and provide hours of fun and entertainment for kids. The puzzle features the Amharic script, also known as the Ge\'ez Fidel, which is used by Ethiopian and Eritrean people and is known as the \"Ha Hu Fidel\" or \"የአማርኛ ፊደላት\" among the Habesha community.\r\n\r\nThe Amharic Fidel wooden jigsaw puzzle is perfect for promoting hand-eye coordination and problem-solving skills in young children. As children assemble the pieces, they will also be learning and practicing the Amharic script, making it an educational tool as well as a fun toy. The puzzle is made of high-quality wood and is durable, ensuring it will last for many play sessions to come.\r\n\r\nThe 33 pieces of the puzzle are designed in vibrant colors that will appeal to kids and keep them engaged while they play. The wooden pieces are sturdy and easy to handle, making it easy for little hands to put together. The puzzle also comes with a wooden board, which serves as the base and helps to keep the pieces in place while kids are playing.\r\n\r\nIn conclusion, the Amharic Fidel wooden jigsaw puzzle is an excellent toy for young children, providing both fun and educational benefits. The puzzle\'s high-quality wooden construction and vibrant design make it a great gift for birthdays, holidays, or any special occasion. Whether you\'re looking for a toy to entertain your child or to help them learn, this wooden puzzle is a great choice. Order yours today and let the fun begin!', 25.99, 'storage/images/RXtI4D1srZUJ4vjQl08EV38t95LoW3kTcrBkciSt.jpg', 'nbmJnCHXaW8', '2024-06-07 09:24:11', '2024-06-09 20:38:08');

-- --------------------------------------------------------

--
-- Table structure for table `progtime`
--

CREATE TABLE `progtime` (
  `ClassId` bigint(20) NOT NULL,
  `Day` varchar(255) NOT NULL,
  `startTime` varchar(255) NOT NULL,
  `id` int(11) NOT NULL,
  `level` varchar(255) NOT NULL,
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `nosit` varchar(255) DEFAULT NULL,
  `endTime` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `progtime`
--

INSERT INTO `progtime` (`ClassId`, `Day`, `startTime`, `id`, `level`, `updated_at`, `created_at`, `nosit`, `endTime`) VALUES
(15, 'Wednesday', '2:00 AM', 818, '7', '2024-06-03 14:43:58', '2024-05-29 11:35:56', '20', '5:00 PM'),
(11, 'Monday', '5:30 PM', 819, '1', '2024-06-09 10:03:04', '2024-05-29 11:39:41', '10', '7:30 PM'),
(11, 'Tuesday', '5:30 PM', 821, '1', '2024-06-09 10:03:17', '2024-05-29 11:40:37', '10', '7:30 PM'),
(11, 'Thursday', '7:30 PM', 823, '1', '2024-06-09 10:03:36', '2024-05-29 11:46:50', '10', '5:30 PM'),
(11, 'Wednesday', '5:30 PM', 828, '1', '2024-06-09 10:27:32', '2024-05-29 11:52:42', '9', '7:30 PM'),
(17, 'Monday', '1:15 AM', 829, '4', '2024-05-30 16:11:28', '2024-05-30 14:30:00', '2', '1:15 PM'),
(12, 'Wednesday', '1:00 PM', 831, '2', '2024-06-04 03:44:05', '2024-05-31 16:21:48', '4', '2:10 AM'),
(15, 'Monday', '6:50 AM', 832, '5', '2024-06-03 14:43:33', '2024-06-03 14:43:33', '10', '7:45 PM'),
(21, 'Tuesday', '1:30 AM', 833, '3', '2024-06-04 05:47:29', '2024-06-04 04:28:22', '-1', '1:10 AM'),
(14, 'Tuesday', '5:30 PM', 834, '1', '2024-06-09 10:06:40', '2024-06-09 10:06:40', '10', '7:30 PM'),
(14, 'Saturday', '4:30 PM', 835, '1', '2024-06-09 10:15:36', '2024-06-09 10:15:36', '10', '6:30 PM');

-- --------------------------------------------------------

--
-- Table structure for table `registeredstudent`
--

CREATE TABLE `registeredstudent` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `StudentId` varchar(255) DEFAULT NULL,
  `Name` varchar(255) NOT NULL,
  `Course` varchar(255) NOT NULL,
  `Semester` varchar(255) NOT NULL,
  `PaymentStatus` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `Completed_date` date DEFAULT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `end_date` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `sublink` varchar(2550) DEFAULT NULL,
  `sent_date` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `title_am` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `description_am` text DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `title_am`, `icon`, `description`, `description_am`, `link`, `created_at`, `updated_at`) VALUES
(5, 'Study Culture', 'Study Culture', 'fa-book', 'To foster a deep appreciation and understanding of Ethiopian culture, history, traditions, and values among our students, promoting empathy, respect, and appreciation for cultural diversity..', 'To foster a deep appreciation and understanding of Ethiopian culture, history, traditions, and values among our students, promoting empathy, respect, and appreciation for cultural diversity..', 'https://www.britannica.com/place/Ethiopia/Relief', '2024-05-25 16:20:52', '2024-05-25 16:20:52'),
(6, 'Language', 'Language', 'fa-language', 'The Amharic alphabet, known as \"ፊደላት\" (Fidelat) in Amharic, is a unique script used for writing the Amharic language, which is the official language of Ethiopia.', 'The Amharic alphabet, known as \"ፊደላት\" (Fidelat) in Amharic, is a unique script used for writing the Amharic language, which is the official language of Ethiopia.', 'https://www.omniglot.com/writing/ethiopic.htm', '2024-05-25 16:22:22', '2024-05-25 16:22:22'),
(7, 'Expert Teachers', 'Expert Teachers', 'fa-users', 'A skilled and knowledgeable educator dedicated to delivering engaging and effective instruction tailored to individual student needs, inspiring academic success and personal growth.', 'A skilled and knowledgeable educator dedicated to delivering engaging and effective instruction tailored to individual student needs, inspiring academic success and personal growth.', 'https://www.ahadustudios.com/instruments', '2024-05-25 16:23:47', '2024-05-25 16:23:47'),
(8, 'Mental Health', 'Mental Health', 'fa-medkit', 'Advocates for emotional well-being, offering support, resources, and understanding to foster resilience and empower individuals in navigating life\'s challenges with strength and positivity.', 'Advocates for emotional well-being, offering support, resources, and understanding to foster resilience and empower individuals in navigating life\'s challenges with strength and positivity.', 'https://youth.gov/youth-topics/youth-mental-health/school-based', '2024-05-25 16:25:03', '2024-05-25 16:33:35');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `name_am` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `position_am` varchar(255) DEFAULT NULL,
  `social_link` varchar(255) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `details_am` text DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `subtitle_am` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `name`, `name_am`, `position`, `position_am`, `social_link`, `details`, `details_am`, `subtitle`, `subtitle_am`, `created_at`, `updated_at`, `image`) VALUES
(16, 'Rekab Zeleke', '1', 'CEO', '1', 'ceo.rakeb@yenetaschool.com', 'I\'m Rakeb Zeleke, the Founder and Director , and I\'m thrilled to extend a warm invitation to you and your family to explore the enriching world of Ethiopian culture and language with us. At Yeneta, we are dedicated to providing a nurturing and immersive environment where Ethiopian kids can embrace their heritage, language, and traditions while fostering a love for learning. Our tailored programs offer a unique blend of language instruction, cultural activities, and educational experiences, ensuring that each child flourishes academically and culturally. Whether your child is taking their first steps in Amharic or eager to dive deeper into Ethiopian history and customs, our team is committed to supporting their growth and development every step of the way. Join us on this exciting journey of discovery and empowerment at Yeneta Language and Cultural Academy. Together, let\'s celebrate Ethiopian heritage and inspire the leaders of tomorrow.', '1', 'Founder and Director', '1', '2024-05-23 14:05:26', '2024-06-10 05:17:08', 'storage/chool/public/images/ihqG6imavHaAK05kX1wJbrSj3XKZBIIeDsERBieA.jpg'),
(25, 'bentu', 'fqeflqef add deffq', 'CEOW', 'm', 'vijopo8415@artgulin.com', '1', '1', 'CEO and Founder', 'wlemfekfqe;q\'fmqemfq\'mf', '2024-06-06 09:36:41', '2024-06-07 05:19:49', 'storage/images/eSOl2ZpEHyrIP9okUczTvH9dAERnpvbQ8GSe4QHp.jpg'),
(26, 'fqeflqef add deffq', 'fqeflqef add deffq', 'CEOW', 'sasasa', 'vijopo8415@artgulin.com', '5', '6', '1', '111', '2024-06-06 09:58:25', '2024-06-09 21:21:09', 'storage/images/ahLiCwVWtvoOBny0hbjhf56rlMAq71c2qgMMv1zJ.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `parent_name` varchar(255) DEFAULT NULL,
  `parent_email` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `emergency_contact` varchar(255) DEFAULT NULL,
  `emergency_contact_number` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `first_name`, `last_name`, `email`, `dob`, `parent_name`, `parent_email`, `mobile_number`, `gender`, `uuid`, `address`, `emergency_contact`, `emergency_contact_number`, `created_at`, `updated_at`, `Status`, `end_date`) VALUES
(137, 'Rakeb', 'Zeleke', 'rgirum911@gmail.com', '2024-05-15', 'Girum', 'yeneabtewelde@gmail.com', '0987654321', 'Female', 'YE0CCD061D', '1', 'abebe kebede', '0987654321', '2024-05-25 18:00:32', '2024-05-25 18:00:32', NULL, NULL),
(138, 'ye', 'neta', 'yeneabtewelde@gmail.com1', '2024-05-07', 'Birrasa Aliko', 'yeneabtewelde@gmail.com', '0987654321', 'male', 'YE3BDE5B7A', '1', 'vijopo8415@artgulin.com', '0987654321', '2024-05-25 18:47:51', '2024-05-25 18:47:51', NULL, NULL),
(139, 'Rakeb', 'Zeleke', 'yeneabte1welde@gmail.com', '2024-05-24', 'Girum', 'yeneabtewelde@gmail.com', '0987654321', 'Female', 'YE6C7E2CFE', '1', 'abebe kebede', '0987654321', '2024-05-29 17:14:49', '2024-05-29 17:14:49', NULL, NULL),
(140, 'ye', 'neta', 'yeneabtewe1lde@gmail.com1', '2024-05-03', '1', 'yeneabtewelde@gmail.com', '0987654321', 'male', 'YEDA09B0EF', '1', '1', '1111111111', '2024-05-29 17:26:40', '2024-05-29 17:26:40', NULL, NULL),
(144, 'ye', 'neta', 'yeneabtewelde122@gmail.com', '2024-06-13', 'abebe tasew', 'yeneabtewelde@gmail.com', '0987654321', 'female', 'YE95F8714E', '1', 'vijopo8415@artgulin.com', '0987654321', '2024-06-02 05:31:56', '2024-06-05 07:36:54', NULL, NULL),
(145, 'ye', 'neta', 'yeneabte1welde@gmail.com', '2024-05-30', 'ee', 'yeneabtewelde@gmail.com', '0987654321', 'male', 'YE0974F87C', '1', 'vijopo8415@artgulin.com', '0987654321', '2024-06-02 05:47:44', '2024-06-05 16:11:44', NULL, NULL),
(146, 'ye', 'neta', 'yeneabtewelde22@gmail.com', '2024-06-05', 'Birrasa Aliko', 'yeneabtewelde@gmail.com', '0987654321', 'female', 'YE05A07277', '1', 'vijopo8415@artgulin.com', '0987654321', '2024-06-02 05:50:35', '2024-06-02 05:50:35', NULL, NULL),
(147, 'ye', 'neta', 'yeneabte1welde22@gmail.com', '2024-06-12', 'Birrasa Aliko', 'yeneabtewelde@gmail.com', '0987654321', 'female', 'YE13DA8C9F', '1', 'vijopo8415@artgulin.com', '0987654321', '2024-06-02 05:53:05', '2024-06-02 05:53:05', NULL, NULL),
(148, 'ye', 'neta', 'yeneabte1wede22@gmail.com', '2024-06-19', 'Birrasa Aliko', 'yeneabtewelde@gmail.com', '0987654321', 'female', 'YEF89E4502', '1', 'vijopo8415@artgulin.com', '0987654321', '2024-06-02 05:54:15', '2024-06-02 05:54:15', NULL, NULL),
(149, 'fqeflqef', 'deffq', 'dagijossy19@gmail.com', '2024-06-30', 'Birrasa Aliko suso', 'vijopo8415@artgulin.com', '0987654321', 'male', 'YEDFCABFCE', 'addis', 'vijopo8415@artgulin.com', '0987654322', '2024-06-03 14:53:22', '2024-06-03 14:53:22', NULL, NULL),
(150, 'ye', 'neta', 'yeneabte1wede122@gmail.com', '2024-05-30', 'yoyo tamu', 'yeneabtewelde@gmail.com', '0987654321', 'male', 'YEE4AB6FEF', '1', 'vijopo8415@artgulin.com', '0987654321', '2024-06-04 16:43:38', '2024-06-04 16:43:38', NULL, NULL),
(151, 'Abdi', 'Birassa', 'abaliko@gmail.co', '2024-06-14', 'Birrasa Aliko  Dorse', 'vijopo8415@artgulin.com', '0987654321', 'female', 'YE24E8B5B8', 'addis', '098-765-4321', '0987654321', '2024-06-07 12:40:40', '2024-06-07 12:40:40', NULL, NULL),
(152, 'Abdi', 'Birassas', 'abaliko822@gmail.com', '2024-06-21', 'Birras', 'vijopo8415@artgulin.comf', '0987654321', 'male', 'YEA365F04B', 'addis1', '098-765-43211', '0987654321', '2024-06-07 12:41:52', '2024-06-07 12:41:52', NULL, NULL),
(153, 'Abdi', 'Birassa', 'abalik2@gmail.com', '2024-06-08', 'Birrasa Aliko  Dorse', 'vijopo8415@artgulin.com', '0987654321', 'male', 'YECAD189EA', 'addis', '098-765-4321', '0987654321', '2024-06-07 12:45:28', '2024-06-07 12:45:28', NULL, NULL),
(154, 'Abdi', 'Birassa', 'abaliko821@gmail.com', '2024-06-01', 'Birrasa Aliko  Dorse', 'vijopo8415@artgulin.com', '0987654321', 'female', 'YE93317D6B', 'addis', '098-765-4321', '0987654321', '2024-06-07 12:47:19', '2024-06-07 12:47:19', NULL, NULL),
(155, 'Abdi', 'Birassa', 'abaliko821@gmail.com', '2024-06-14', 'Birrasa Aliko  Dorse', 'vijopo8415@artgulin.com', '0987654321', 'female', 'YE8142E9F6', 'addis', '098-765-4321', '0987654321', '2024-06-07 12:49:02', '2024-06-07 12:49:02', NULL, NULL),
(156, 'Abdi', 'Birassa', 'abaliko82000@gmail.com', '2024-06-16', 'Birrasa Aliko  Dorse', 'vijopo8415@artgulin.com', '0987654321', 'female', 'YEDC0E08BC', 'addis', '098-765-4321', '0987654321', '2024-06-07 12:50:20', '2024-06-07 12:50:20', NULL, NULL),
(157, 'Abdi', 'Birassa1', 'abaliko812@gmail.com', '2024-06-28', 'Birrasa Ali1', 'vijopo8415@artgulin.co1', '0987654321', 'male', 'YE79103345', 'addis1', '098-765-4321', '0987654321', '2024-06-07 12:52:07', '2024-06-07 12:52:07', NULL, NULL),
(158, 'Abdi', 'Birassa', 'abaliko812@1gmail.com', '2024-06-15', 'Birrasa Aliko  Dorse', 'vijopo8415@artgulin.com', '0987654321', 'female', 'YEDDB75077', 'addis', '098-765-4321', '0987654321', '2024-06-07 12:55:35', '2024-06-07 12:55:35', NULL, NULL),
(159, 'Abdi', 'Birassa', 'abalikoq822@gmail.com', '2024-06-22', 'Birrasa Aliko  Dorse', 'vijopo8415@artgulin.com', '0987654321', 'female', 'YE81D789DB', 'addis', '098-765-4321', '0987654321', '2024-06-07 12:56:49', '2024-06-07 12:56:49', NULL, NULL),
(160, 'Abdi', 'Birassa', 'abaliko822@gmail.com', '2024-06-15', 'Birrasa Aliko  Dorse', 'vijopo8415@artgulin.com', '0987654321', 'male', 'YED5709F85', 'addis', '098-765-4321', '0987654321', '2024-06-07 12:58:58', '2024-06-07 12:58:58', NULL, NULL),
(161, 'Abdi', 'Birassa', 'abaliko82@gmail.com', '2024-06-21', 'Birrasa Aliko  Dorse', 'vijopo8415@artgulin.com', '0987654321', 'male', 'YE71EFAF14', 'addis', '098-765-4321', '0987654321', '2024-06-07 13:03:42', '2024-06-07 13:03:42', NULL, NULL),
(162, 'boni', 'Birassa', 'abdialiko52@gmail.com', '2024-06-13', 'Birrasa Aliko  Dorse', 'vijopo8415@artgulin.com', '0987654321', 'male', 'YE3F10DFBF', 'addis', '098-765-4321', '0987654321', '2024-06-07 13:05:23', '2024-06-07 13:05:23', NULL, NULL),
(163, 'boni', 'Birassa', 'yeneabtewelde@gmail.com', '2024-06-28', 'Test12000', 'vijopo8415@artgulin.com', '0987654321', 'female', 'YEF79F0E8B', 'addis', '098-765-4321', '0987654321', '2024-06-07 13:13:38', '2024-06-07 13:13:38', NULL, NULL),
(164, 'elia', 'nuja', 'eliasnuru456@gmail.com', '2024-06-08', 'Test12000', 'vijopo8415@artgulin.com', '0987654321', 'female', 'YE00A0A4CE', 'addis', '098-765-4321', '0987654321', '2024-06-07 13:14:34', '2024-06-07 13:14:34', NULL, NULL),
(165, 'elia', 'nuja', 'eliasnuru@gmail.com', '2024-06-19', 'Test12000', 'vijopo8415@artgulin.com', '0987654321', 'male', 'YE5EB81D54', 'addis', '098-765-4321', '0987654321', '2024-06-07 13:16:29', '2024-06-07 13:16:29', NULL, NULL),
(166, 'Rakeb', 'Zeleke', 'rakebgirum911@gmail.com', '2024-06-08', 'Grium Girma', 'vijopo8415@artgulin.com', '0987654321', 'female', 'YE9955248F', 'addis', 'Grium Girma', '0987654321', '2024-06-07 15:57:41', '2024-06-07 15:57:41', NULL, NULL),
(167, 'Grium', 'Girma', 'rakeb_Zeleke@yahoo.com', '2024-06-06', 'Grium Girma', 'vijopo8415@artgulin.com', '0987654321', 'male', 'YEA019E1FC', 'addis', 'Grium Girma', '0987654321', '2024-06-07 16:04:12', '2024-06-07 16:04:12', NULL, NULL),
(168, 'Yaresema', 'Girum', 'girumgir@gmail.com', '2018-09-12', 'Girum Nigussie', 'girumgir@gmail.com', '2403534436', 'female', 'YE4BF22D0A', '6604 Karlson ct Hyattsville MD 20783', 'Girum Nigussie', '2403534436', '2024-06-09 09:55:27', '2024-06-09 09:55:27', NULL, NULL),
(169, 'Etel', 'Girum', 'mnhar369@gmail.com', '2022-08-05', 'Girum Nigussie', 'girumgir@gmail.com', '2403534436', 'male', 'YEFFAF3647', '6604 Karlson ct Hyattsville MD 20783', 'Girum Nigussie', '2403534436', '2024-06-09 10:27:25', '2024-06-09 10:27:25', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subclasses`
--

CREATE TABLE `subclasses` (
  `Course` varchar(255) NOT NULL,
  `Course_am` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `stripe_id` varchar(255) NOT NULL,
  `stripe_status` varchar(255) NOT NULL,
  `stripe_price` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription_items`
--

CREATE TABLE `subscription_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `subscription_id` bigint(20) UNSIGNED NOT NULL,
  `stripe_id` varchar(255) NOT NULL,
  `stripe_product` varchar(255) NOT NULL,
  `stripe_price` varchar(255) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `professional` varchar(255) DEFAULT NULL,
  `professional_am` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `author_am` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `image`, `author`, `professional`, `professional_am`, `rating`, `created_at`, `updated_at`, `author_am`) VALUES
(7, 'storage/images/nTwfBrchhdQTFXC8fLMZ0QeEdlxUsuFtWX3FvA0a.jpg', 'beza mesfin', '\"Choosing Yeneta Academy was the best decision for our child\'s language journey!\"', '\"Choosing Yeneta Academy was the best decision for our child\'s language journey!\"', 4, '2024-05-23 14:18:27', '2024-05-23 14:18:27', 'beza mesfin'),
(8, 'storage/images/QMRi9a28Ygwh1ktLqndgMeiYpBxz5qknhxWvGkT9.jpg', 'nahom yelaw', '\"Personalized attention at Yeneta Academy has boosted our child\'s progress.\"', '\"Personalized attention at Yeneta Academy has boosted our child\'s progress.\"', 5, '2024-05-23 14:19:01', '2024-05-23 14:19:01', 'nahom yelaw'),
(9, 'storage/images/p05lKuKoStPZ4Tbl8VuHWpWEWbaaEIjm1pAmTDWC.jpg', 'Zemzem Ahmed', '\"Yeneta Academy provides a nurturing environment our child loves.\"', '\"Yeneta Academy provides a nurturing environment our child loves.\"', 5, '2024-05-23 14:19:46', '2024-05-23 14:19:46', 'Zemzem Ahmed'),
(10, 'storage/images/IpvGgJAlWcbSR8mX7amhxJrpA9hl8P1yuE5uRNG6.jpg', 'Yanew Zeleke', '\"Thanks to Yeneta Academy, our child\'s language skills have soared!\"', '\"Thanks to Yeneta Academy, our child\'s language skills have soared!\"', 5, '2024-05-23 14:20:41', '2024-05-23 14:20:41', 'Yanew Zeleke'),
(11, 'storage/images/X7zOtyqSSlNurkb65z3tQf5DUrdOvPPrmo0vjUMX.png', '1', '\"Thanks to Yeneta Academy, our child\'s language skills have soared!\"', '3', 1, '2024-06-06 08:58:02', '2024-06-06 08:58:02', '2'),
(12, 'storage/images/MlV7NOKJeqWnMxTeDFCZcjI5oj1TTB0CpquB5V3g.png', 'inu1', '1', '1', 5, '2024-06-06 08:59:44', '2024-06-06 08:59:44', '1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `stripe_id` varchar(255) DEFAULT NULL,
  `pm_type` varchar(255) DEFAULT NULL,
  `pm_last_four` varchar(4) DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `stripe_id`, `pm_type`, `pm_last_four`, `trial_ends_at`) VALUES
(1, 'abebe', 'infoadmin@gmail.com', NULL, '$2y$10$xq5Ua2IPMUdfx8Z3AT8YAeCaRwAjZalccbqCEqQ60akRrSUOP6P1e', NULL, '2024-04-28 12:14:44', '2024-04-28 12:14:44', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `why`
--

CREATE TABLE `why` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Vision` text DEFAULT NULL,
  `Vision_am` text DEFAULT NULL,
  `mission` text DEFAULT NULL,
  `mission_am` text DEFAULT NULL,
  `value` text DEFAULT NULL,
  `value_am` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `why`
--

INSERT INTO `why` (`id`, `Vision`, `Vision_am`, `mission`, `mission_am`, `value`, `value_am`, `created_at`, `updated_at`) VALUES
(1, 'Our vision is to be a premier educational institution that serves as a beacon of Ethiopian culture and language excellence in the United States and beyond. We aspire to create a vibrant community where children of all backgrounds come together to learn, grow, and connect through the exploration of Ethiopia\'s diverse linguistic and cultural traditions.', 'ተመንናችን እንደ አንድ አናቀማምት ትምህርታዊ ተቋም ሆነን በአሜሪካ እና በሌሎችም ቦታዎች የኢትዮጵያ ቋንቋና ባህልን ለማብራር መሰንበር መሆን ነው። ልጆች በሁሉም በተለያዩ ቃላተኛዊ እና ባህላዊ መሰረቶች እንዲማሩ፣ እንዲያዳግሙ፣ እና እንዲያገናኙ የተለዋዋጭ ማህበረሰብ መፍጠር እንፈልጋለን።', 'Mission: Our mission at Yeneta Cultural and Language Center is to preserve, promote, and celebrate the rich linguistic and cultural heritage of Ethiopia. We are dedicated to providing comprehensive language education and immersive cultural experiences that empower children to embrace their heritage, foster cross-cultural understanding, and become global citizens.', 'ተልዕኮ: በየነታ ባህልና ቋንቋ ማህደር ላይ የእኛ ተልዕኮ የኢትዮጵያን ባህልና ቋንቋ ሀብት ለማስቀመጥ፣ ለማበረታታት እና ለማክበር ነው። ልጆች ህብረተሰባቸውን እንዲቀበሉ፣ ዝርዝር ባህላዊ እውቀት እንዲያገኙ፣ እና በዓለም አቀፍ ምንካራት የሚሆኑ እንዲሆኑ የሚያበረታታ ትምህርት እና የባህል ልምድ ማቅረብ እንዳብረን ነው።', '1. Language Proficiency: To equip students with the linguistic skills and cultural knowledge necessary to communicate effectively in Geez and Amharic, enabling them to connect with their heritage and engage meaningfully with Ethiopian communities worldwide.\r\n2. Cultural Understanding: To foster a deep appreciation and understanding of Ethiopian culture, history, traditions, and values among our students, promoting empathy, respect, and appreciation for cultural diversity.\r\n\r\n3. Community Engagement: To actively engage with the local Ethiopian and broader communities in Silver Spring, Maryland, through cultural events, outreach programs, and partnerships, serving as a hub for cultural exchange and collaboration.\r\n\r\n4. Educational Excellence: To maintain the highest standards of educational excellence through innovative teaching methods, experienced instructors, and personalized attention, ensuring that each student reaches their full potential academically, linguistically, and culturally.\r\n\r\n5. Global Citizenship: To nurture a sense of global citizenship among our students, empowering them to become compassionate, culturally competent leaders who contribute positively to their communities and advocate for social justice and equality on a global scale.\r\n\r\nThrough our mission, vision, and goals, we are committed to inspiring a new generation of proud Ethiopians who embrace their heritage with pride, passion, and purpose, while also fostering understanding and appreciation for Ethiopia\'s rich cultural legacy among people of all backgrounds.', '1. ቋንቋ እና ባህል ችሎታ: በጊዜና በአማርኛ ቋንቋዎች ተሳታፊዎችን በተሳሳተ መንገድ ለማስተማርና እና ለማሳደግ፣ በአለም አቀፍ ኢትዮጵያዊ ማህበረሰቦች ጋር መገናኘትና መተዳደር እንዲችሉ የበቂ ቋንቋና ባህል ትምህርት ማሳገር እንዲሁም ማኅበረሰብ ተመሳሳይ እንዲሆኑ ነው።\r\n\r\n2. ባህላዊ መረዳት: ለተማሪዎቻችን የኢትዮጵያ ባህል፣ ታሪክ፣ ባህልና እሴቶችን በጥልቅ መረዳት እና መስተዋል ማስከበር፣ በተመኖሩ ባህል ስነስርዓት ላይ እንዲከበሩና የተለያዩ ባህሎች መቀበል እንዲቻሉ ማሳደግ ነው።\r\n\r\n3. ማህበረሰብ እገታ: በመሰወረስፕሪንግ፣ ማርያላንድ እና በአለም አቀፍ ኢትዮጵያዊና ሌሎች ማህበረሰቦች ጋር በባህላዊ ክስተቶች፣ በመድረክ ፕሮግራሞች እና በማህበራት በማበረታታት በባህላዊ ምክርና በምክር እንዲሆን ማስተዳደር ነው።\r\n\r\n4. ትምህርታዊ ብልህነት: በድርጊት የተቻለ እና ተማሪ ዘንድ ተመንምኖ የተዘጋጀ ትምህርት ዘዴ፣ በሚዛንማ እና በሚሰማሩ ትምህርት ተመራማሪዎች እና በተግባር ምክር እየሰጡ በበቂ የትምህርት ብልህነት ለመጠበቅ ማስተዳደር ነው።.\r\n\r\n5. ዓለም አቀፍ እንግዳነት: በልጆች መካከል የአለም አቀፍ እንግዳነት ማስቀመጥና እንዲሆኑ አሳስበኝ እና በማህበራት ተሳታፊ የሆኑ የባህላዊ ብልህነት እሴቶች ያላቸው መሪዎች ለመሆን ማስተዳደር ነው።.\r\n\r\nበዚህ ተልዕኮ፣ በዚህ ራዕይ እና በዚህ ተልእኮ እንዲሁም በምክር የተመሠረተ ህይወት ማብረቅ እንዲሆን በታላቅ ፍላጎት እንደሚገኙ እና በተመኖሪያ መሳሪያ እንዲቀርቡ የታላቁ ኢትዮጵያዊዎች ውልድ እንዲቀነሱ በመሳሰሉት ዓላማዎች ላይ እናደርጋለን።.', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_us`
--
ALTER TABLE `about_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comp`
--
ALTER TABLE `comp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invoices_invoiceid_unique` (`invoiceId`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `maintitle`
--
ALTER TABLE `maintitle`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_orderno_unique` (`orderNo`);

--
-- Indexes for table `partner`
--
ALTER TABLE `partner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `progtime`
--
ALTER TABLE `progtime`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registeredstudent`
--
ALTER TABLE `registeredstudent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subclasses`
--
ALTER TABLE `subclasses`
  ADD PRIMARY KEY (`Course`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subscriptions_stripe_id_unique` (`stripe_id`),
  ADD KEY `subscriptions_user_id_stripe_status_index` (`user_id`,`stripe_status`);

--
-- Indexes for table `subscription_items`
--
ALTER TABLE `subscription_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subscription_items_stripe_id_unique` (`stripe_id`),
  ADD KEY `subscription_items_subscription_id_stripe_price_index` (`subscription_id`,`stripe_price`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_stripe_id_index` (`stripe_id`);

--
-- Indexes for table `why`
--
ALTER TABLE `why`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_us`
--
ALTER TABLE `about_us`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `comp`
--
ALTER TABLE `comp`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `maintitle`
--
ALTER TABLE `maintitle`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=238;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT for table `partner`
--
ALTER TABLE `partner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1111135;

--
-- AUTO_INCREMENT for table `partners`
--
ALTER TABLE `partners`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `progtime`
--
ALTER TABLE `progtime`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=836;

--
-- AUTO_INCREMENT for table `registeredstudent`
--
ALTER TABLE `registeredstudent`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=310;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=170;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscription_items`
--
ALTER TABLE `subscription_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `why`
--
ALTER TABLE `why`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
