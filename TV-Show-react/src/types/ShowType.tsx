
export default interface Shows {
    score: number,
    show: {
        id: number
        url: string
        name: string
        type: string
        language: string
        genres: [string]
        status: string
        runtime: number
        averageRuntime: number
        premiered: Date
        officialSite: string
        schedule: {
            time: number
            days: string[]
        }
        rating: {
            average: number
        }
        weight: number
        network: {
            id: number
            name: string
            country: {
                name: string
                code: string
                timezone: string
            }
        }
        webChannel: string
        dvdCountry: string
        externals: {
            tvrage: string
            thetvdb: number
            imdb: string
        }
        image?: {
            medium: string
            original: string
        }
        summary: string
        updated: number
        _links: {
            self: {
                href: string
            }
            previousepisode: {
                href: string
            }
        }
    }
  }
  export default interface ShowSingle {
    
        id: number,
        url: string,
        name: string,
        type: string,
        language: string,
        genres: string[],
        status: string,
        runtime: number,
        averageRuntime: number,
        premiered: Date,
        officialSite: string,
        schedule: {
            time: string,
            days: string[]
        },
        rating: {
            average: number
        },
        weight: number,
        network: {
            id: number,
            name: string,
            country: {
                name: string,
                code: string,
                timezone: string
            }
        },
        webChannel: {
            id: number,
            name: string,
            country: null
        },
        dvdCountry: string,
        externals: {
            tvrage: number,
            thetvdb: number,
            imdb: string
        },
        image?: {
            medium: string,
            original: string
        },
        summary: string,
        updated: number,
        _links: {
            self: {
                href: string
            },
            previousepisode: {
                href: string
            }
        }
        _embedded: {
            cast: [
                {
                    person: {
                        id: number,
                        url: string,
                        name: string,
                        country: {
                            name: string,
                            code: string,
                            timezone: string
                        },
                        birthday: Date,
                        deathday: Date,
                        gender: string,
                        image: {
                            medium: string,
                            original: string
                        },
                        _links: {
                            self: {
                                href: string
                            }
                        }
                    },
                    character: {
                        id: number,
                        url: string,
                        name: string,
                        image: {
                            medium: string,
                            original: string
                        },
                        _links: {
                            self: {
                                href: string
                            }
                        }
                    },
                    self: boolean,
                    voice: boolean
                }
            ]
        }
    }  
  