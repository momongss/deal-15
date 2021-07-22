// Menu
export function getChatList() {
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
}

export function getSaleItemList() {
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
}

export function getWatchItemList() {
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
}

// Main
export function getLocationList() {
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
}

export function getLocation() {
  return '역삼동';
}

export function getProducDatatList(location, categoryId) {
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
}
