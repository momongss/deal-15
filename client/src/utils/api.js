export const api = {
  // product-detail
  getProductInfo(productId) {
    return {
      id: '0',
      title: '빈티지 롤러 스케이트',
      category: '기타 중고물품',
      status: '판매중',
      price: 169000,
      images: [
        'data:image/png;base64,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',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEUBAQH///8AAAD8/PwFBQXw8PDt7e309PT39/e/v7/e3t7k5OTQ0NCzs7ONjY1VVVUrKyuqqqrU1NQiIiJPT0+9vb01NTV6enpCQkLo6OiBgYGhoaGVlZViYmKvr69vb2+bm5sRERFISEhaWlrIyMh8fHwaGho9PT1oaGgtLS1ycnIkJCQcHBwWuvQ9AAATeElEQVR4nN1dCVfiMBBuJ+WQGxSVWxDFVf//79skbY6ZNKXFBqnz9u3btULzde4jaRRfRiyOBxtIILoKQTLqy3teQNGlCIePAElyHYBRAgCb2WUrvQAh489y+w2CfddCCBGHCOPBJXy8hIdsKu53JQG1YAIcLsBYFSH//uH99dFpjK+9iguuzsMj17/olxBKjLu21JMQCMXX9sbcvvwWPEnc6Iy6VVhSCSFb/ooCIhIL2M8rsLGKlM7htxkoKeFsfCivjmURsrg//k0FtEkK0pqxcnwszcMVXC2COU98KTApGQGUQcifVf/51xUQkRAnWDJWwuaUQhhzF3+1+KU0cTb2SgQA5xGyuHMzGoiJS9XLeaNagofHW9JARHxdh/Y5Lp5DyOLRTbgIHwEcz7CxGCGLWw/Cbv02Di+JxY2KIZ7h4eyKSeCFlMC40KIWIORPZntbPiKX+Aq/+gXKWMjD5a2aGJsgVcbqCBnrvN4+AyUJQVvFPlH1I2yfbtrGYEq4vamGsBv3901BJ0hUqjyqmI+QCSN6i2GMl7i8PXRz7U0eQm5EBzft5vMJTq08iLkIZa7bJA4K4ly8b5fiIZMAGyWiKSUSosPFHISSg7+93EuIsyUHYo6Uznmg1kiEwmm8O7pIETKRLDWThZHUxUnrDEJpRRuLUOjiiTgNjJDFvQZzUBDXxQdWgDBe7JsQbBdSAh+oemMjZHF30mwOSgJY+hDG7KHx8ATAhGcaeQi59D79AYCRDMPvDBdtHq7+gIhK4jh62txYCI+NNzKG4KvjIlz8FQ5G0me8KoOqEDL2+IcQiuBmTRDGb39IRiOpikcspQ0Ot3NJhGZphBqlItpveLDmkihrSDnNePjcPBk9t94kc/yRjNbWDeTgWa0SXpFjkzycNQ5gOhNSvGgulo9MIpSO4korq4eAJxD74fLcovkjWKdSum4YQMHCJ8aDzBK/14ujNOm9wqpqo7RNweJhGYTPAuFzs4q/osgyT2ueZX53GsXTG++BShy2lKnG9rGM5HHudS6r/l5NrgXL0nAku6VI/uLMA5T4OETLSwBepSausMHX4XSvYQJsTTJU4luSqGowI/3QVWyTAPhvdJf2Ijqz9ZeoT1iNwlbJRVQKuLOHut8NB6ExivssezJoznLZdPj6QU9edEsuodJKxS0OL2Jkrh0WoZw+7MSEFs8AVntpX+saUuZNnu46MpCNO6ERbtxmIP//s1ViimudN5ebAabW2CoLqIpC018o/zRIQ4/1svCui2/wHhIhDMuMOdda3ZXyj+45CYVQWEwPBwkzN/VKaZ/c4hAOIWxKcLA1fahVUUSQjukjFMAE7rtnAfZ2wjLUWpeAAblHqA4AX/agGCCLW7ssvqn1xnNyn7P5Z9GXWeRe+zwzE8vu5MBk3U9YR4OKRhffQYZ9H6u7u9XGFTRAPj2XWmG2taCGlaASGbbvqwBeM7vVd62FKDycoXEQI+fcePoDhJkzEMJIS+0AHVtGpUZStbxcfAqXtSQIS9QQPN8k3LkBsMMMwf1b/u/2bEF5OA3Dww9ym1IZds73JMRmdfZ2EQXA3gnD4u6nlRAqKpcYVl7ZK7lNyQyb2EywOag4Yn9gYl9iQuWywq5FZdOmiggfCMJeqQSbL+/+eWL2vCWySobJNjZkEHYoKqNCftBnWJAOBDxWFxWRbg0XLGaLVQoRqJpJGplvAhJYnLIyVAt/YhIE4TdZV4kaAkgDLBG1ZckycSQhlQYLIcKSdRvIoLqof4ZACHhZrOsXFciePFc5Td2DEDho54Ur76A/+IhYPM+w218kEAYZigHAs/CMZ9j5vxilMSOHM7U8GWvtQYR+eQhVEM8/s0MXtuoCyqZYvWmTQYh1gcX57Rxh+u5FAYXYFDnzOMoDaJfnSVyxVTwk4cZnGB5Sx3vAnlq5hoeXgSwvUJvCZevdkzOYuh1xfVpK3/AHggQ1boK4sQvtScq8p7S6KTrKYxpssRlNwBT1DUK89+WoEJJwYx0GIV3fzvJiplDFsvLCxMli+f/zWcg6yiPSmyifyx8Xosuj/gKAieoWaHoDywSOjrYh+nSLHkVkPDgRFMVceMYf2AbplmGLHduOGui1pZMvF9O3B6GKKmi4cRcmbJuSZb1Yfpokj8vXgjS9vxqtiAT/01Er3oGuogr4xr9/DMNDWuGzImZqzbctX6WFMZEsYMvBjFkmqtDdK/3EBf5SUX91hHRzmJUg+jeOUXzsGaTdxZUKlbQnRNzZvUKInXE/DMJPstw7C+FTSYTCAIPrenRQQ1Xhn0KInXHZvlpFhCSF4X7avlaOhtlOB+L3dGWSqsJBIcRPJBDCMUFoJYjUX0kSqki0UTk+mufrGIWK+6tCiC0QC4Pwkax3YXmLUw5CnjLRuuAQVNqB9U17cCruKgCl+3zfgyB8p+u3EH6Ra6JvOzwBvOITVo7aomD3oktLomNhX3hTPCThRq19NY2QJIi2qLjXWPdDhnIvaMVZiC2b8TgPVF9EHOlIISQhRaAUmPq4vcVEx/1txGEoQJRXZ/NEGo/alh4wwpVCSEKKcRiEtK3+ZSGkGrfKhgdPaMU6CiOGeaa/6B9GqKIKGlLswiCkKE56XREJtJma+8fFQdP8J7zVHhzesTCoqILa2J+0hQog0gTREhVizY0Lj3AWrC0NNr7aaNFaiYoqaLgRqK5Pz2WyeqQ4rzPFMLpitcefG18buuEtUQUVVXAbiygQD+nZE1aPlFrzjWfFX+rne/RjZhBiVegpvT1QhEEU0U0QzbUtthBPesVYQU/65/irEs/vLxRCEm58XDtBdLqLS200sfIePNI70T9Hv890gniPEYYZk3B6pHaCiD27KRWRwsvGI40GOVZo1YOhFXdPrfanCCskiFOVhHuSCJoOvXpS4Dg/yQ80cpaTIJqwjUTMQ206sPKuNUJsmLVZpsquUmBcqBkEAehYbKuQ6ySIOjsmyvuiEWLevuWnwEyF2KijU2pK/yKENAm0e0akfzrQUorDLR2FeRJEEoCyjLmAMmNmhLpmhKRoaVdL6LWeRogVdO6RxpVGSMYFpnKQQTgRo4gsTA9YRsWImFVLgAmOztoaCVZe3fx3EkT1cyIorXTmGuO+eEjiHEKSAtuPEvbYv3XUpDtRXq26Xt7SPExOPr/ixC1Ic03cPKFJoOmR0uhMz9eSpq9JEDFXjiZso/H9fPN5h51tsD0+DgpTjHd7bxqhL4nA0mtKvHSSgem/9A8+Q22FcDuIjxZC0onRSQRWXpNEYOk1vM02flKM1n97gTjoorDb6dSDqwliICmtSSKw9PbB7IjJbfVbX/EQbptWQY/U6S76EkQl2DhIYSYMcyegCK1CzpfjOIRZ7XSn3LdRuQVRXiXYpP7YNYen0VSQ0Czkfp2CIVqn3Pep0yesvDpB3OPf3xtFdJrNmrjPaIc8D9eVnzWYzJUkj0uP9R9r3mLp/acRRq6t0QjjVtjzc3ISRNOeJi0VvfGWcCRLIvgHcb/MpLSQOLN9GT4W97/CbqrPSRAT3zUThvm6TDgFtmJpyB8CkFsqA28no1MtVgcRaII411KKFdR0mfI7iOlnJs6eruy1BWE3u4LTJSzoIKrsOPEkiFR68d4G+FrQQIYN34Pv6gRniNZOEElOYEJsrKBGerF7wSXexLZcAmln+g/CH03iFC2LE0RlNGmXKb+88YJ5yD/3rY3tYvjh2ZtRO0TaJbR2WcI9vqTbp1x58zqItJtEJv+1V2Qxl0641jGAkBArbpW8aInXJBFYQWcaIS5vDG0EYEWB7SuxL1sVncWzE0R8SRc6SUew7ylXHBFCeRpZ+rHRNY9DcMatUYJIkkedPuE6oC5iE/di1we5SJrJzdOV2JetiiaIJwsh8dKqKk2q1V1LenGP1Hb5Vl/1W6Vh4q8oO2AhCpYC0/TJThDJNZ1EAFbecz1S6Sqs7zqYyUxEQUA6aa49REuvmU4EVlAdq3vKG2SMgfWeFab7583yZTifz7cvT6e0h143SPf0enuIllwzPRhPl2mCgxZjLtHeLv6vdm82m/UWWM9b840MAWrGWLTL0k0Q1XpxiK2T/3eMcG+EkaYwHuo91C+qTo/UmreumCBGZBeelSA6Mx/5xEQgVLuY0h6p3UEkT/5cl8nLW2cbYAHGbd3porPLsrCDqFbs6zJh9/Kqf+4tYjgImb1lqh6E9PHaCSLpLpoEMT+JcEdMM78H3fOHKRg61YxwR77fThBJd/F8B5EmiJmlufdVaXLpWC8TnR5pwYipBu/tMnl4SzpcxcRqnlKsliCqC1hBDW/zE0TYV+Ehq9meOrss7RFT8uwXysw5SYT6BJZePYVYTQ/N0F89COkQrV2M3+OFtXQ8iZVXh9ikvKHNshMaFlO95+QUD9Hi6KyrEeLqjukyUek1ZY9KVKs1dTuINkISiqhRbKK8JvnH0jswUZuz/76QNnWW4OjNmbXl2FnYRK04PwWm0qtLV67FLqaLzpvzI6QdxGejhzRBVMk5ToFN85+4F1O6SmDHKrwqtt5BTH8HERwLMdZihxerk39fB1F4/W35N/7WipDGIWKTj+lckHjyQyPsoo/o5B/z1k4QhWUej9ZpM5h1+Z9Wb3acr9ZPu+V0RvhbMw+LEkRyzQzpecYQ8VsZ7JMVEnkWw5RlUwpvuH6xwyHBrl5vcUGCSKfcTRKBeWttg5EF4FmcHdzylI39q3QXhmiLeL17850E0Rqhowmi6cFgBd1phFZtkgM52Z4HvvtqzmRNc0BSY/6qF6E/QXQ89VYbR6ygI62fi4wLkgY6hBYc3OsjBd0NsTgCrvf8Rjf/xnsQkX7orRIkiVhrhNow96ebBHHwXQ/qdZ2j/UiTr970yemDFieICglu/5sxRMlbdnx7VHqmEfZiZWVWjoyiTeUit6j30Da6y9IqVdME0YTYWEFNiD2Ie6sxOaFH+go9x8acswshQoed+c6uuBwhHZMoSBDVpYQor0kQH+TRuem5NTYE07RgjpaJFznivWL1Nm7IRi10DI+bICoptZWXWedLpWVrB8LEOhClD/gaedERq3trCdA+qL0hlyaP50LsKL8riGpzbGHpufhAMscRTe0bgmmaa59JRcdPzZCe3BeaHorROS7PFFaQmFihvTxaZITPpa2/mugmgWwP3mu6B6MSxMyuFCoOPgqMpWNsKR22HfmcLIy1H2sG7h7EggRRJxGiy9Sef+4BewXPLdAdWNzffYm209vcPU2RBTheMO+cVu+1k7I0k9n6AOXaYc6eaaF1HfpGQ0WOs/w5wMRJEO1pLXJNb8CsMGoAOTv7nTlo9eNBiBa/01T4sHhIOog7gzAqW2jIQ+ijXpBBTCdBfNP3sE7tkA+8f1Fa45RkPcTiXhJkSKogQbQn2Lhd+b7MCOTse88HeAw0RVSYIKYlXjZby9Z7dJGSlD1+aQVh3soBBcfwyJcWLKYfSUmz6bvFNseqUAZ2Ps66nQvJTRCtN6HAZj2RHj35yZCEc4RKDs0DDns7uyztc1ppHnTRDbiYFtRKxaXeOOScm1OPtlo/tdwWEicHxdT7lMcw/fxOvgVYW13ko659iw7gAyXN3STuwSb0oKJKAtMltOe7Wl8xkd5COta8vU/91b/gg5gg53zSE6gH68cgtxNu7qmFoHHqDtandJL2gm+s8rvZHF5v+hpyrpVj3N2pTIW1B9u300/uVsVvCoTdu2XKPPk4g2BMpE+9P4xfX8eP78pCX3yrKgG6yEMV84KqO6boZ+69WlU8ScEFH9zVrrUGJ7ut9OlrziTXQ0l03Unq6xNEPCy56Vfn/Yi4dzlEf+aN6nnELcYgyuvv/BUCsWVH9JrDHFr7+8RN8L4r3yUbfzbvfcclSNRx7uL0bbndet9CdyOUdeKiLJH9gwij9NVY6ZvHxQaqP4ZRyKickYiyfK9pr3U+S/L9dEwjlC3bv8VFveVVTyYN/xZCzrAOQWidk998EgI5yAoEGqE8TPy3V1YXgTzf10HYSQKXea5FIF/noko8RkqZejVP44nDOJlDqK0ZSGYfdNFkEu8kMvVIe8pTDAI2MIsnJGoePaveihDKGLzhTkMU6o6xB6GgTcPdIkT0hUMYIZPv1mo0iTk65kcohuYfG8xFoWN0z42DMG5PGgwxISeN5CDktPhuKkTOQfdtKS5CFi/eG+n6cShTxMM4bn810PULHaRNeB9CxlqT4Icy1U0A9LSfIh7GcefUMC7mWdFChIwFnXioncRiPadN+BCKobzmBHCiNZ5/Up8XYTZi3BCE9sFSVRDG1VqLv0gJfPW8UzhehIIGTYAoVPCBnmBVDiFPphaPty+p6SYM/xxVIQ85yt2FY5TXIlFb2hZuGy5GyJh6r9Ftkljavle8L/oMDznNvm/WbQgnsTk3rHkeIet83CgXC9x8JYSxdBs3qIycgY9+J1EFobCpDyGOR/sRCQbmvgX7Eh6Kr1mFOB7tchImdFLuFJRSUiqof7gdZZQ7EUa+d0RfiJCJs8NuBKLA99zL2yr0E4TyvPDPW7A4IA9cKIuvCkLBxtnz7/ORr+CpU+HwkwoIJW2/fxkjwLjaOUvVEPIn113/aGD3Z+A4/burwL/qCCV1lvAb+igN6D3dWhYEIYvbb9cXVRFxvE9LeogfIhTUGu2vykZxZM1jdf4J+g9GDdJCjiiWBAAAAABJRU5ErkJggg==',
        'data:image/png;base64,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',
      ],
      createdDatetime: '2021-07-22T04:24:31.104Z',
      content: `웹 애플리케이션을 구축하든 모바일 앱을 만들든, 프론트엔드 백엔드 개발은 필수적인 부분입니다. 만약 여러분이 기술에 대해서 잘 모르신다면, 프론트엔드 백엔드 개발 사이의 차이점을 이해하기 어려울 수도 있는데요. 두 가지 개발 모두 강력한 성능을 가진 웹 또는 모바일 솔루션을 구축할 수 있는 서로 다른 기술들을 보유하고 있습니다.`,
      count: {
        chat: 1,
        watch: 0,
        views: 29,
      },
      saler: {
        id: '0',
        name: 'Username',
        location: '역삼동',
      },
    };
  },
  // Menu
  getChatList(productId) {
    return [
      {
        id: '0',
        name: '닉네임',
        lastMessage: '남은 물건 있나요?',
        lastDatetime: '2021-07-21T10:37:03.666Z',
        messageCount: 0,
        image: '',
      },
      {
        id: '0',
        name: '닉네임2',
        lastMessage: '남은 물건 있나요?',
        lastDatetime: '2021-07-21T10:37:03.666Z',
        messageCount: 9,
        image: '',
      },
      {
        id: '0',
        name: '닉네임2',
        lastMessage: '남은 물건 있나요?',
        lastDatetime: '2021-07-21T10:37:03.666Z',
        messageCount: 9,
        image: '',
      },
      {
        id: '0',
        name: '닉네임2',
        lastMessage: '남은 물건 있나요?',
        lastDatetime: '2021-07-21T10:37:03.666Z',
        messageCount: 9,
        image: '',
      },
      {
        id: '0',
        name: '닉네임2',
        lastMessage: '남은 물건 있나요?',
        lastDatetime: '2021-07-21T10:37:03.666Z',
        messageCount: 9,
        image: '',
      },
      {
        id: '0',
        name: '닉네임2',
        lastMessage: '남은 물건 있나요?',
        lastDatetime: '2021-07-21T10:37:03.666Z',
        messageCount: 9,
        image: '',
      },
      {
        id: '0',
        name: '닉네임2',
        lastMessage: '남은 물건 있나요?',
        lastDatetime: '2021-07-21T10:37:03.666Z',
        messageCount: 9,
        image: '',
      },
      {
        id: '0',
        name: '닉네임2',
        lastMessage: '남은 물건 있나요?',
        lastDatetime: '2021-07-21T10:37:03.666Z',
        messageCount: 9,
        image: '',
      },
      {
        id: '0',
        name: '닉네임2',
        lastMessage: '남은 물건 있나요?',
        lastDatetime: '2021-07-21T10:37:03.666Z',
        messageCount: 9,
        image: '',
      },
      {
        id: '0',
        name: '닉네임2',
        lastMessage: '남은 물건 있나요?',
        lastDatetime: '2021-07-21T10:37:03.666Z',
        messageCount: 9,
        image: '',
      },
      {
        id: '0',
        name: '닉네임2',
        lastMessage: '남은 물건 있나요?',
        lastDatetime: '2021-07-21T10:37:03.666Z',
        messageCount: 9,
        image: '',
      },
      {
        id: '0',
        name: '닉네임2',
        lastMessage: '남은 물건 있나요?',
        lastDatetime: '2021-07-21T10:37:03.666Z',
        messageCount: 9,
        image: '',
      },
    ];
  },
  getSaleItemList() {
    return [
      {
        id: '10',
        image: '',
        title: 'Title',
        watch: true,
        location: 'Location',
        createdDatetime: '2021-07-21T10:37:03.666Z',
        price: 160000,
        count: {
          chat: 0,
          watch: 1,
        },
      },
    ];
  },
  getWatchItemList() {
    return [
      {
        id: '10',
        image: '',
        title: '관심',
        watch: true,
        location: 'Location',
        createdDatetime: '2021-07-21T10:37:03.666Z',
        price: 160000,
        count: {
          chat: 0,
          watch: 1,
        },
      },
    ];
  },
  // Main
  getLocationList() {
    return [
      {
        label: '역삼동',
        state: 'normal',
      },
      {
        label: '봉천동',
        state: 'normal',
      },
    ];
  },
  getLocation() {
    return '역삼동';
  },

  getProducDatatList(location, categoryId) {
    if (location == null) {
      console.error('location 없음.');
      return;
    }
    if (categoryId != null) {
      const filteredItemList = [
        {
          id: '0',
          image: '',
          title: '필터된 아이템',
          watch: false,
          location: '역삼동',
          createdDatetime: '2021-07-21T11:59:16.229Z',
          price: 24500,
          count: {
            chat: 1,
            watch: 0,
          },
        },
      ];

      return filteredItemList;
    }

    return [
      {
        id: '0',
        image: '',
        title: '파랑 선풍기',
        watch: false,
        location: '역삼동',
        createdDatetime: '2021-07-21T11:59:16.229Z',
        price: 24500,
        count: {
          chat: 1,
          watch: 0,
        },
      },
      {
        id: '0',
        image: '',
        title: '파랑 선풍기',
        watch: false,
        location: '역삼동',
        createdDatetime: '2021-07-21T11:59:16.229Z',
        price: 24500,
        count: {
          chat: 0,
          watch: 1,
        },
      },
      {
        id: '0',
        image: '',
        title: '파랑 선풍기',
        watch: false,
        location: '역삼동',
        createdDatetime: '2021-07-21T11:59:16.229Z',
        price: 24500,
        count: {
          chat: 1,
          watch: 4,
        },
      },
      {
        id: '0',
        image: '',
        title: '파랑 선풍기',
        watch: false,
        location: '역삼동',
        createdDatetime: '2021-07-21T11:59:16.229Z',
        price: 24500,
        count: {
          chat: 1,
          watch: 0,
        },
      },
      {
        id: '0',
        image: '',
        title: '파랑 선풍기',
        watch: false,
        location: '역삼동',
        createdDatetime: '2021-07-21T11:59:16.229Z',
        price: 24500,
        count: {
          chat: 1,
          watch: 0,
        },
      },
      {
        id: '0',
        image: '',
        title: '파랑 선풍기',
        watch: false,
        location: '역삼동',
        createdDatetime: '2021-07-21T11:59:16.229Z',
        price: 24500,
        count: {
          chat: 1,
          watch: 0,
        },
      },
    ];
  },
};
