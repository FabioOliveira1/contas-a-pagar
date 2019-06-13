<template>
  <section>
    <!-- Filter -->
    <v-card>
      <v-card-title>
        <h1 class="f-size-20 w-100">Filtros</h1>
        <p>Use os filtros para carregar os dados</p>
      </v-card-title>

      <v-card-text class="p-t-0">
        <v-form @submit.prevent="generateReport" ref="form">
          <v-layout wrap>

            <v-flex xs12 sm6 md4>
              <v-select v-model="filters.type"
                :items="types"
                item-value="id"
                item-text="name"
                label="Tipo de relatório"
                :rules="[v => !!v || 'Campo obrigatório']"
              />
            </v-flex>

            <v-flex xs12 sm6 md4>
              <v-select v-model="filters.orderBy"
                :items="fields"
                item-value="id"
                item-text="name"
                label="Ordenar por"
                :rules="[v => !!v || 'Campo obrigatório']"
              />
            </v-flex>

            <v-flex xs12 sm4 md4>
              <v-select v-model="filters.orderDirection"
                :items="directions"
                item-value="id"
                item-text="name"
                label="Sentido"
                :rules="[v => !!v || 'Campo obrigatório']"
              />
            </v-flex>

            <v-flex xs12 sm8 md6>
              <m2-date-range v-model="filters.dateRange" label="Período" :rules="[v => !!v || 'Campo obrigatório']" />
            </v-flex>

          </v-layout>

          <v-layout class="m-t-10">
            <v-spacer></v-spacer>
            <v-btn color="#004973" dark type="submit" :loading="loading">
              <span class="f-bold m-r-10">Gerar</span>
              <i class="fa fa-print"></i>
            </v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>

  </section>
</template>

<script>
import { generateReport } from '@/services'
import Notify from '@/utils/notify'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

export default {
  data () {
    return {
      publicPath: process.env.BASE_URL,
      loading: false,
      filters: {
        type: null,
        orderBy: 'value',
        orderDirection: 'asc',
        dateRange: {
          from: null,
          to: null
        }
      },
      types: [
        {
          id: 'supplier',
          name: 'Fornecedor'
        },
        {
          id: 'accounts-group',
          name: 'Grupo de contas'
        }
      ],
      fields: [
        {
          id: 'value',
          name: 'Valor'
        },
        {
          id: 'name',
          name: 'Nome'
        }
      ],
      directions: [
        {
          id: 'asc',
          name: 'Crescente'
        },
        {
          id: 'desc',
          name: 'Decrescente'
        }
      ],
    bySupplier: [
    [
            {
                text: 'Fornecedor'
            },
            {
                text: 'Risco'
            },
            {
                text: 'N° de contas'
            },
            {
                text: 'Valor (R$)'
            }
    ],
    [
            {
                text: 'Papeis Silva'
            },
            {
                text: 'Alto'
            },
            {
                text: '50'
            },
            {
                text: 'R$ 250.000,00'
            }
    ],
    [
            {
                text: 'Chapas Andrade'
            },
            {
                text: 'Alto'
            },
            {
                text: '20'
            },
            {
                text: 'R$ 150.000,00'
            }
    ],
    [
            {
                text: 'Chico Tintas'
            },
            {
                text: 'Alto'
            },
            {
                text: '60'
            },
            {
                text: 'R$ 125.000,00'
            }
    ],
    [
            {
                text: 'Logística Lins'
            },
            {
                text: 'Médio'
            },
            {
                text: '230'
            },
            {
                text: 'R$ 75.000,00'
            }
    ],
    [
            {
                text: 'New Man Computadores e Eletrônicos'
            },
            {
                text: 'Médio'
            },
            {
                text: '10'
            },
            {
                text: 'R$ 43.000,00'
            }
    ],
    [
            {
                text: 'Lunga Cá'
            },
            {
                text: 'Baixo'
            },
            {
                text: '82'
            },
            {
                text: 'R$ 20.000,00'
            }
    ],
    [
            {
                text: 'Carlos Refrigerações'
            },
            {
                text: 'Baixo'
            },
            {
                text: '3'
            },
            {
                text: 'R$ 10.000,00'
            }
    ],
    [
            {
                text: 'Francis Móveis e Estofados'
            },
            {
                text: 'Baixo'
            },
            {
                text: '1'
            },
            {
                text: 'R$ 3.000,00'
            }
    ],
    [
            {
                text: 'Almeida Cadeiras'
            },
            {
                text: 'Baixo'
            },
            {
                text: '1'
            },
            {
                text: 'R$ 2.500,00'
            }
    ],
    [
            {
                text: 'IPTU'
            },
            {
                text: 'Médio'
            },
            {
                text: '1'
            },
            {
                text: 'R$ 1.250,00'
            }
    ],
    [
            {
                text: 'Total Geral',
                bold: true,
                colSpan: 3
            },
            {},
            {},
            {
                text: 'R$ 679.750,00'
            }
    ]
  ],
    byAccountsGroup: [
    [
            {
                text: 'Grupo de contas'
            },
            {
                text: 'Risco'
            },
            {
                text: 'N° de contas'
            },
            {
                text: 'Valor (R$)'
            }
    ],
    [
            {
                text: 'Contas Essenciais'
            },
            {
                text: 'Alto'
            },
            {
                text: '130'
            },
            {
                text: 'R$ 525.000,00'
            }
    ],
    [
            {
                text: 'Despesas Regulares'
            },
            {
                text: 'Médio'
            },
            {
                text: '240'
            },
            {
                text: 'R$ 118.000,00'
            }
    ],
    [
            {
                text: 'Contas Secundarias'
            },
            {
                text: 'baixo'
            },
            {
                text: '86'
            },
            {
                text: 'R$ 33.000,00'
            }
    ],
    [
            {
                text: 'Transferência bancária'
            },
            {
                text: 'baixo'
            },
            {
                text: '1'
            },
            {
                text: 'R$ 2.500,00'
            }
    ],
    [
            {
                text: 'Tributos Municipais'
            },
            {
                text: 'Médio'
            },
            {
                text: '1'
            },
            {
                text: 'R$ 1.250,00'
            }
    ],
    [
            {
                text: 'Total Geral',
                bold: true,
                colSpan: 3
            },
            {},
            {},
            {
                text: 'R$ 679.750,00'
            }
    ]
  ]
    }
  },
  created () {
  },
  methods: {
    getDateTime () {
      let now = new Date()
      let date = [('0' + now.getDate()).slice(-2), ('0' + (now.getMonth() + 1)).slice(-2), now.getFullYear()].join('/')
      let time = [('0' + now.getHours()).slice(-2), ('0' + now.getMinutes()).slice(-2), ('0' + now.getSeconds()).slice(-2)].join(':')
      return date + ' ' + time
    },
    generateReport () {
      if (this.$refs.form.validate()) {
        console.log(this.filters)
        this.loading = true
        generateReport()
          .then(({ data }) => {
            let dd = {
              content: [
                {
                  style: 'header',
                  layout: 'noBorders',
                  table: {
                    widths: [100, '*', 200],
                    body: [
                      [
                        {
                          style: 'logo',
                          image: 'logo',
                          fit: [100, 200]
                        },
                        { text: `Resumo de Contas a pagas por ${this.filters.type === 'supplier' ? 'Fornecedor' : 'Grupo de Contas'}`, style: { alignment: 'center', fontSize: 16, bold: true }, margin: [0, 10, 0, 0] },
                        { text: `Data: ${this.getDateTime()}\nUsuário: Carlos da Silva`, style: { alignment: 'right' }, margin: [0, 12, 10, 0] }
                      ]
                    ]
                  }
                },
                { text: `Informações do período de ${this.filters.dateRange.from.split('-').reverse().join('/')} até ${this.filters.dateRange.to.split('-').reverse().join('/')}`, style: 'title' },
                {
                  style: 'tableExample',
                  layout: 'lightHorizontalLines',
                  table: {
                    heights: 20,
                    widths: ['*', 45, 80, 125],
                    body: this.filters.type === 'supplier' ? this.bySupplier : this.byAccountsGroup
                  }
                },
                {
                  text: 'Discriminante: Essas informações são de uso totalmente exclusivo da M2 Print',
                  style: ['quote', 'small'],
                  color: 'gray',
                  margin: [0, 40, 0, 0]
                }
              ],
              styles: {
                header: {
                  margin: [-32, -40, -40, -40]
                },
                logo: {
                  alignment: 'center',
                  margin: [0, 5, 0, 5]
                },
                title: {
                  fontSize: 14,
                  margin: [0, 50, 0, 10]
                },
                tableExample: {
                  fontSize: 14
                }
              },
              images: {
                logo: 'data:image/png;base64,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dgnbbbdd+NKXvlT69fjfAQD50tT8Or75dVypqqFRo0aFkSNHpgrq74ADDggXXnhhqvigLl26hLfffjt07do17ZA1McR5+umnU0VRxL+7G220UfjMZz4TNt5447DOOuuEYcOGhZ49e6b/Yuneeeed8MQTT4Rx48aFBx54INx6663h8ccfT78KAGTMbjoBIDEXoGWDBw8WAGTY5MmTBQAFEq/z3GeffcKVV14Z3nzzzXD33XeHU089Ney5555hgw02aFMAEC277LJhww03DPvtt1/47W9/Gx577LEwceLEcPrpp4dPfvKT6b8CALJCCACJ4wAtMw8g2+655560Is823XTTcPnll4dXX301XHTRRWHnnXcOvXv3Tr9aWauuumr43ve+F+69997w4IMPht133z106uQtBQBkgX+xIdEJ0DLzALItfhJMfsUz/PFh/B//+Ef4+te/HpZZZpn0K7URuwv++Mc/ljoEttpqq7QLADQqIQAkK6+8siFYLdAJkG3xHDf5s/7665ce/K+//vqGaMuPYeGYMWPCn//8Zz9LAaCBCQHgA3QDlCcEyLbYrk1+xE/6f/GLX4T777+/dASg0cSbBh5++OHw2c9+Nu0AAI1ECAAfYC5AeY4DZNekSZNKgwHJhzjZP854OPLII0Pnzp3TbuOJMwP+9re/hd122y3tAACNQggAH6ATYHErrrhi6NevX6rIGl0A+RHP2//73/8uHQPIgu7du5dmBXzrW99KOwBAIxACwAfoBFicowDZFtuyyb54Pd8NN9xQuv4vS5qamsK5554b9thjj7QDANSbEAA+QAiwOCFAtj366KNpRVZ9+9vfDhdccEFDt/8vSbw68MILLwyf/vSn0w4AUE9CAPiA/v37h5VWWilVROYBZJsQINvimfqzzjqr9Il6lsVhhldffXXpZywAUF9CAPgIcwE+TCdAds2ePTs888wzqSJrPvWpT4WLLrqo9El6HsRrWM8+++xUAQD1IgSAj3Ak4MOEANn1xBNPhHfffTdVZMkKK6wQrrjiitJwvTzZeeedS1cIAgD1IwSAj9AJ8L7Ywrv66quniqyJIQDZFD8xj9fs5dGvfvWr0KNHj1QBALUmBICP0AnwvuHDh2d2GBkhPPXUU2lFlsRPynfZZZdU5U8MN77//e+nCgCoNSEAfIQQ4H1rr712WpFFQoDsWXbZZcOp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jz/++FRBCN26dSt1AAwbNiztAEA2CAEAYAnuv//+sO+++6YKFrrwwgvDpptumioAyI44wSZ+tFHzcbajRo0KI0eOTBUANJ6JEyeGTTbZJLz22mtpB5rfOB1/fOk6wEY3e/bstKqNTp06ha5du+ZqQGK8BjTOA6mlLl26lF5505Hfy/g9Ze5G27z33nth7ty5qWq7+He5c+fOqVrcu+++G+bNm5cqyunevXtaNR4hAACUMWXKlNInvePHj087EMJee+0VLr744oZ/0I1v0OOb+Hro0aNHaV5CfA0aNCisttpqYcSIEWGdddYJ//Vf/xVWXHHF9F82viFDhoTnn38+VbXVs2fP0u9h//79/+/3ce211y7dHBR/H5dbbrn0X2bDJz7xifDoo4+mqm3i78PkyZNTVd4ZZ5xR6trq06dP2im2Bx98MGy88capars///nPYdddd03V4uLPwTgsl5ZNmzYt9O7dO1WNxXEAAPiIGTNmhG222UYAwId84QtfCOeff76rAJciXqX50ksvhf/85z9hzJgx4ZxzzgmHHXZY2HrrrcNKK61UulEhPjxcfvnlS32wK7K33367dB3pQw89FK6//vpw5plnhkMOOSRsvvnmoW/fvuHjH/94OPjgg0uzKWbOnJn+t4rrkUceCdtvv31455130g7QEiEAAHxAfAO54447hn//+99pB0IYPnx4uOqqq0oDAemY5557rvQpYuyqWHnllcOXvvSlcO6554apU6em/4KliW31MaQ866yzwi677FLqrog/t/70pz/V/BhII7nrrrtKvx8daYOHIhACAEASP3nbbrvtwj/+8Y+0A6F0BeANN9xQakmmsuKxhdtuuy0cdNBBYZVVVil1CDz88MPpV2mteN4+fo/uueeepWDlBz/4QSlsKaKxY8eWAqb4vQWUJwQAgGaLjgAIAPigOIzs2muvLbWwU13xE+zYIbDhhhuWjg7ce++96Vdoi3gOOZ6Pj90re++9d3jqqafSrxRHvNb1f/7nf2o+1BGyQggAQOG99dZbYYsttgj/+te/0g4sdMEFF4TPfe5zqaJWbr755vCZz3ymNJisqJ9od1ScDn/ZZZeVBgnGB+LXX389/UoxxPkdP/rRj1IFfJAQAIBCi9f/xUFb9913X9qBhU444YRSezX1E+cwxFsF4p+Fc97tE9vi43DGeENDnL1QpE/Hf/nLX4Zf/OIXqQIWEQIAUFgvvvhiaeJ7nGIOH7TPPvuEY445JlXUU3z4P/7448NGG21kXkAHxGMCcfZCHMT4wgsvpN38O+qoo8LZZ5+dKiASAgBQSBMmTAibbbZZIc/LsmQxGIqfmNJYHnvssbDJJpuE0047zVnvDrj99tvD+uuvH6644oq0k3/xKsV4cwKwkBAAgMKJAUA8AhC/wge5CrCxxa6Aww8/POy2226lYZ60T+wK2H333Uu3CMybNy/t5lcMjfbdd98wZsyYtAPFJgQAoFAmTZpUCgAmTpyYdmCh/v37h9GjR7sKMANiULPpppuW/j7TfvEWge23374UCuRdDDu+9rWvhTvuuCPtQHEJAQAojDfeeCNsueWWAgAWE68CvOaaa8KQIUPSDo1u3LhxpeMBZnp0zC233FIKVF5++eW0k1+zZs0KO+ywQ3jooYfSDhSTEACAQpg5c2bYdtttw5NPPpl24H0XXnihqwAz6JVXXnG7RwU8+uijpVkYRTgiNX369LD11lubB0OhCQEAyL14X/Zee+0VHnjggbQD74vXz+2xxx6pImveeuutUoePv98d8+yzz5YClSIcsYhdYV/+8pcLdUsCfJAQgBYVYVAMUAw//vGPw3XXXZcqeJ+rAPMhnmnfaqutSp9o037xqFS8QvDVV19NO/kVw474PRMDASiapubX8c2v40pVDY0aNSqMHDkyVTSiN998szQcqakpfpsAZNOll15amgoNHxXbn8eOHZvLmwDefffd0LVr11QVx8CBA8Pdd98dBg0alHY6Js6IeP7551NVHBtuuGHpKsFevXqlnY77xCc+0e6QJr4fnTx5cqrK+9a3vhUuuuiiVLXeBhtsEG677baw/PLLp518ePDBB8PGG2+cqrb785//HHbddddULe6ee+4JF198caqqLwZ9HbnmsW/fvqVbRWopXmfavXv3VDUWIQAteu2110KXLl3CCiuskHYAsiW+Cfr85z8fZs+enXZgoXgV4F133ZXbmwCKGgJE6623XunPtmfPnmmn/YoaAkRxhkrsoOrUqTKNw40aAkRxMOJNN90UevTokXayr9ohQK09/fTTYcSIEalqu49//OOlYaIs5DgALYpvIIrQDgbkU2zx/OpXvyoAYDEx3L7hhhtcBZhT8baA+EAY74an/W688cZw7LHHpirf4rWB8YHXUViK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DB48uDRd21WAVIuusMrI47+pW2+9dbjooosqGkDG9yGxI8AxFBqBEIAWffSHekwxZ8yYkSrIFiFA47r99tvDT37yk1TBwqsAR48eHVZcccW0A5UXb5yg47p165ZW+bLnnnuG0047LVWV8dhjj5VmBOTpCAXZJASgReUSct0AZNWzzz6bVj79aSSvvvpq6RolfyYs4ipAamWZZZZJKzoiz7+P8braOJi0ku69997SrQFz5sxJO1B7QgBaVO7TUsMByaqnn346rXQCNIr45xA/aXnttdfSDoRw7rnnugqQmujTp09a0RF5/3088cQTw3e+851UVcatt95aCsDnz5+fdqC2hAC0qNyDkk4AskoI0HiOP/740lEAWCR+4rbvvvumCqqrX79+aUVHFOH38cwzzyzdXlNJ1157bSlcWLBgQdqB2hEC0KJy7blPPPFEWkG2CAEaS/wU5OSTT04VuAqQ2hs4cGBa0RGrrLJKWuVX586dwx/+8Iew+eabp53KiMMHDzvssFRB7QgBaFG5ByUhAFk0bdq08Prrr6fKTIB6i38We+21l08/+D+uAqQeVl111bSiI1ZbbbW0yrc4+yB+er/RRhulnco444wzSkcOoJaEALSopeMAHqDImmeeeSatFtIJUD/xwf+b3/xmaSAgREOGDCm9sXYVILU2bNiwtKK94l36a6yxRqryr3fv3uHGG28Mw4cPTzuVcdxxx4VRo0alCqpPCECLyj3sz549O0ycODFVkA0fnWUhBKifU089NYwZMyZVFF28CvCGG24I/fv3TztQG/FauxhA0TFDhw7N7RWBLYlXl44dO7bixyAOPfTQ0pEDqAUhAC1q6UHJkQCy5oPzACIhQH3cd9994aijjkoVRecqQOppvfXWK32KTcdssMEGaVUsq6++eikIiEFmpSzqlLvuuuvSDlSPEIAWCQHIi4+GAI601N7MmTNL1yHNmzcv7VB0559/vqsAqZtPf/rTaUVHbLLJJmlVPOuuu264/vrrQ48ePdJOx8X33rvvvrubc6g6IQAtaulBSQhA1ugEqL8f/OAH4bnnnksVRfeTn/wk7L333qmC2vv85z+fVnRE0X8f41DTK664oqJdJXPmzAk77rhjqXsOqkUIQIt0ApAXQoD6+utf/xouuOCCVFF0e+65Zzj++ONTBbUXb6HYYostUkV7xVkeRT0O8EHbbrtt6XaTSordc/H/7vjx49MOVJYQgBa11Anw5JNPphU0vjfffDNMmTIlVQsJAWrntddeC9/+9rdTRdFtuummpUDIVYDU0yc/+UnDKCtg6623Dp06eZSI4rW3p59+eqoqI75/2WqrrcKECRPSDlSOv7m0qKUHpXjH90cfqqBRlQutzASojTjk6IADDgiTJ09OOxRZvFLrmmuuKd21DfX0ta99La3oCL+PH/a9732v4sNvX3rppfDlL3/ZtbpUnBCAFi3p01JHAsiKct+rOgFq49xzzw2jR49OFUUWP3WN3wv9+vVLO1AfsQtlt912SxXt1adPn7DlllumikVOOumkine/Pfvss6WuCx/AUUlCAFq0pE9LhQBkRblOACFA9cUhgIcffniqKLL4yX/sAHAnO40gzgJYbbXVUkV7feMb3wjdu3dPFR/0u9/9Luy8886pqoxx48aF7bffPrz99ttpBzpGCECLdAKQBzoBai8eA4ifhLzzzjtphyK76KKLwuc+97lUQX0deOCBaUVHfOc730krPqpz587hsssuC5tvvnnaqYy77767FC7MnTs37UD7CQFokRCAPCj3vWomQHXFYwC33XZbqiiyk08+uXTnNTSCwYMHh5122ilVtFc8o77eeuulinIWdUBtuOGGaacybrnlltIQQh9m0FFCAFq0pAelxx9/PK2gccW0vNzd9P7xrJ4XXnghHHnkkamiyOJQyB/96Eepgvo74ogjSp/S0jH+XrfOcsstF2688cYwdOjQtFMZV155ZTjooINKXXfQXkIAWrSkB6X4YDVnzpxUQWOKw3TKfR8LAaojviGJLaIzZsxIOxRV/KQwnouFRrH66quHb37zm6mivb74xS9WvM09zz72sY+FsWPHhpVXXjntVEa8alXgTkcIAWjRkh6UYpfAU089lSpoTC0dWxECVEc8+33zzTeniqKKbcJXXHFF6NKlS9qB+otT27t165Yq2uvnP/95WtFaa665ZikI6Nu3b9qpjF//+tf+PGg3IQAtWtq5aXMBaHTlbgaIzASovNdff91tAIRVVlkl3HDDDaU2WGgUn/3sZ8Oee+6ZKtpr3333DZ/+9KdTRVt8/OMfD9dff33o0aNH2qmMo48+Opx99tmpgtYTAtCipX1aai4AjU4nQO3EAGDq1Kmpooh69epVCgBWXXXVtAP117Vr13DWWWeFpqamtEN7rLDCCuGUU05JFe0Rw6hqdEkdfPDB4U9/+lOqoHWEALRoaZ+WCgFodEKA2og3AcTrkCiu+KY2vrndYIMN0g40hh//+Mcm2VfAGWecUTrfTsdsu+22pfP8lRTn8eyzzz5h9OjRaQeWTghAi3QCkHUtHQcQAlROvIFh5MiRqaKozjnnnLDVVlulChpDbF0/5phjUkV7ff3rX3ecooL23nvv0nn+Spo/f37Yddddwx133JF2YMmEALRoaQ9K8QHLwxSN6tVXXw3Tpk1L1YeZCVA5v/zlL1sMWyiGn/3sZ6au03D69OkTLr/8cgMqO2jIkCHOnFfBD37wg4pftTh79uywww47hIceeijtQMuEALRoaQ9K8YrACRMmpAoay5I6VYRXlRGvCo0PgBTXIYccUmq3hkYSz//HI0pxKjvt17Nnz3DNNdcY9Fkl8d/P/fffP1WVMX369FJXlnCepREC0KLWPCg5EkCjEgJU36GHHlr65IFi2m233cLpp5+eKmgcv/jFL8I222yTKtojBikXX3xxaao91RF/j2OXxVe/+tW0UxmTJ08OW265ZXjhhRfSDixOCECLhABkmRCgum666SZDiArsv//7v8Mll1wSOnXyNoLGEielH3HEEamivU477bSw8847p4pq6dy5c+nYyhe/+MW0UxmTJk0K++23X6pgcf71pkWtOTctBKBRjR8/Pq0WZyZAx8ybN690npFiijcAXH311aFbt25pBxpDHF4Xp9jTMT/5yU/C9773vVRRbcsss0y49tprw3/913+lncqIRwOgJUIAWqQTgCzTCVA9Z555pvOGBRXPWN94443OCNNw4mT0iy66SHdKB8VhdT/96U9TRa3En6ljxowJQ4cOTTtQXX5S0qLWPCi1dA871NOUKVNKtwO0RAjQfvH39sQTT0wVRbLiiiuGsWPHhgEDBqQdaAyx7dlNAB0Xb3s5+eSTU0WtfexjHyv9jF155ZXTDlSPEIAWtaZlOl7B9sorr6QKGsPSOlSEAO130kknlYIAiqVHjx7huuuu8ykVDSd+cn3BBReUzlbTPvFoz6WXXhoOP/zwtEO9xG6rOHMnXnEJ1SQEoEWtfVBa0tlrqIelhQBmArTP888/XzoKQLHECdbxAeHTn/502oH6iw+u559/fumT6/g9SvvET51vv/328I1vfCPtUG/rrbdeKXTt3r172oHKEwLQotY+KJkLQKPRCVAdxx57bJg7d26qKIpf//rXpoTTUFZZZZVw2223hW9961tph/b4/Oc/Hx544IGwySabpB0aRfyzueKKKxxxoWqEALRIJwBZtbTvSSFA240bN6505pZi+e53vxu+//3vpwrqb4cddggPPfRQ+MxnPpN2aKv4YBmPdsUgxYyPxrXddtuVjrpANQgBaJEQgKzSCVB5Rx99dFiwYEGqKIIdd9wxnHrqqamC+urbt2/pgeivf/1raUgl7RNbze+6665w1FFHmaOQAXvvvXepGwsqTQhAixwHIIvefvvtMHHixFSVZyZA29xzzz1h9OjRqaIIPvnJT5Y6PzwkUG/xvP++++5beq/xzW9+M+3SVr179y6FerH9f+ONN067ZMEPfvCD8L//+7+pgsoQAtCi1n5a+sYbb4TJkyenCuqrNddW6gRom+OOOy6tKII11lijNJRq2WWXTTtQH1tssUW47777wu9///vS9Wm03wEHHFA62uOMeTbFAZhmYFBJQgBa1JYHJUcCaBSt6UwRArTenXfeGW655ZZUkXex5frGG28MK620UtqB2oqf/Mez0P/85z/DzTffHDbccMP0K3TEaaedFq699tpUkTXx78U555wTdtppp7QDHSMEoEVtaZkWAtAoWvO9KARovRNOOCGtyLv4CeGVV14Z1lprrbQDtRM/6Y/31Mcg9/rrry9NR6ey4rGK1nTL0Zji8aw//vGPYbPNNks70H5CAFrUlgclcwFoFI899lhatcxMgNa5//77dQEUyG9/+9uw+eabpwqqb9CgQeE73/lOuOmmm8KkSZPCL3/5yzB8+PD0q1TajBkzwle/+tUwffr0tEPWdO/evTQcc/3110870D5CAFrkOABZpBOgcuIZRIrh4IMPDgceeGCqoPLiw8sGG2wQ9t9//1Jbc/xZ/cILL4Szzz47bLnllqFr167pv6SannzyyVJHgNtesmv55ZcvBWdDhw5NO9B2Tc2v45tfNZ/6NGrUqDBy5MhU0YjWXXfdVn/Cv/LKK4eXXnopVVAfs2bNKk1AXton/dtss41p90sR36DHq6S8Ucy/OHwtzgEwMCxfYtjZ0QfreCf/4MGDU7V0nTp1Ct26dSsNlYzzJVZYYYUwcODAsNpqq5Ve8dezZsiQIeH5559PVdttuummHZ5rMGHChNKnv5UUj3odc8wxqaqNT3ziE+HRRx9NVdv069dvqUOo4+C8iy66KFVtE1vt582bl6psiN+Xn/vc58Krr76adirrz3/+c9h1111TVX9PP/10GDFiRKra7uMf/3gYN25cqhAC0KJ4LvSpp55K1dK99dZboU+fPqmC2nvooYfCRhttlKqWxU+dYopOy+KndXEiN/k2bNiwcO+99/rZnUOVCAHiLRHbb799qoqpoyFAvOM9XvHWETHYjgPhKhlex0FzcfbCtttum3aqTwhQefGh9gtf+EKYNm1a2qkcIUC+OQ5Ai9p6btpcAOqttcdSzARYsvipwmWXXZYq8qpXr17hmmuuEQBAg4sdFH/4wx869AD0UbHLa6+99grPPPNM2iGLYrASw5x43AbaQghAi9p6btpcAOqtNUMBIzMBlix2as2dOzdV5NXFF18c1llnnVQBjSyeA4+hXTzyVilTp04tDQqcOXNm2iGL4k0a8VP72M0ArSUEoEVCALKmtd+DQoCWzZ49uzS0i3yLZ4Hjm38gO+IxzUsvvbTUyl8pMTyPx7/Mf8m2OL/j/PPPTxUsnRCAFrW1ZVoIQL3pBOi4eAfxm2++mSryaLvttgvHHx/HAQFZs+OOO1b87+8VV1wRfvWrX6WKrIq3PvhzpLWEALSorQ9KZgJQT/FmgNYObzIToGXxrnjyK14pFc8WZ3FKO7BQ7OT5yle+kqrK+PGPfxxuueWWVJFVhx12WDjyyCNTBS3zLoAWtTUEiPf9zpgxI1VQW/Hu49Y+3OsEKO/OO+8MDz/8cKrImzg4Kn7iF88WA9kVjwPEmR5rr7122um4+O/nHnvsUbqOkGz7+c9/XropAZZECECL2vNpqW4A6qW1RwEiIUB55557blqRR7HLY/31108VkGVxQOBf//rXit7uEa96jrNC3nnnnbRDFsWQ6Oyzzy5dKwktEQLQovY8KJkLQL205XtPCLC4KVOmlD4lJp/23nvv0vAvID/i8Z54nWslj/c88sgj4cADD0wVWdWlS5fSjJ/NNtss7cCHCQFoUXselNryaSxUUlu+98wEWFycOB1vBiB/1l133XDWWWelCsiTbbbZJpx00kmpqowYLJxxxhmpIqviEbDYLaIDjHKEALSoPQ9KOgGoF50AHfP73/8+rciTZZddttThEb8C+fS///u/YbfddktVZRxxxBHhn//8Z6rIqjgDZsyYMWHw4MFpBxYSAtAinQBkRbwZ4LnnnkvV0gkBPiy2f8YX+XP66aeX7hYH8iueAb/gggvCeuutl3Y6bv78+WHXXXcNkyZNSjtk1YABA8LYsWPDSiutlHZACMAStKcTIN4QMHPmzFRBbTzxxBNt+n4VAnxYnDJN/uy8887hgAMOSBWQZz179gzXXntt6NevX9rpuDfeeCN87WtfC3PmzEk7ZNWQIUNKQYDbYVhECECL2vug5EgAtdbWDhQzAd4XP+25/PLLU0VeDBo0yG0PUDBrrrlm+NOf/hQ6d+6cdjruvvvuCyNHjkwVWfaJT3wiXHfddaVZASAEoEVCALKirSGAToD33XbbbeH1119PFXmw6A7xSn4iCGTDFltsEU455ZRUVUacGROvnCP7Nt100/DnP/+5okER2SQEoKwFCxaUXu0hBKDWhADtFz81Il/iQK/NN988VUDRHHbYYWHPPfdMVWUceuih4a677koVWbbDDjuE8847L1UUlRCAsjrSLm04ILUmBGifeM7z6quvThV5EK8D/OlPf5oqoKjiQ96GG26Yqo6bN29eaT7AK6+8knbIsv3226/iHSNkixCAsjrykKQTgFp6++23w4QJE1LVOmYCLPS3v/0tTJs2LVVkXWzvjG27yyyzTNoBiqpHjx6lkLd///5pp+NeffXV0o0Bc+fOTTtkWewa++EPf5gqikYIQFkdeUiaOHGiGwKomccff7zNR1d0Aix0zTXXpBV5EO8K33jjjVMFFN1qq60WrrjiitClS5e003HxSMD3v//9VJF1sRtg3333TRVFIgSgrI4+JMUHM6iF9hw/EQIs/D2IU4LJh3g/+LHHHpsqgIW+8IUvhFNPPTVVlRGHBF544YWpIsviINl4dCTOCaBYhACU1dGHJHMBqBUhQPv861//CpMnT04VWbboGEC3bt3SDsD7DjnkkNIZ8Eo6+OCDS9cHkn2xUyTeGBBvDqA4hACU1dEz0+YCUCvtCQHMBAjhhhtuSCuy7rvf/W5FB4AB+XPWWWeFT33qU6nquDhYdpdddnHFbE5079691B24/vrrpx3yTghAWToByAqdAO0zevTotCLLVl555XD88cenCqC8ODD0qquuCiuttFLa6bgXX3wx7L777mH+/Plphyxbfvnlw5gxY8LgwYPTDnkmBKAsnQBkwYwZM8ILL7yQqtYregjw/PPPhyeeeCJVZNlpp50WlltuuVQBtGzgwIGlIKBr165pp+P+8Y9/mDCfIwMGDAhjx46taFhEYxICUFZHH5LiDQHxAQ2qqb1hU9FDgBtvvDGtyLItt9wy7LbbbqkCWLrPfvaz4Te/+U2qKiP+3/vDH/6QKrJuyJAhpY6APn36pB3yqKn5FfsIjytVNTRq1KgwcuTIVNFoXnrppbDqqqumqn3uueeeip4/g4+K04kPOOCAVLVep06dCt2++NWvfjX89a9/TRVZFFt7x40bF4YNG5Z2AABaRycAZVVicJq5AFRbe7/HijwYMHZB3H777akiq+I93QIAAKA9hACUVYl2aSEA1daR77GiHgm4//77w7Rp01JFFsWzmkcddVSqAADaRghAWUIAsuDRRx9Nq7Yragjwt7/9La3IqhNOOCH07t07VQAAbSMEoCzHAWh0U6dODS+//HKq2q6oRwL+/ve/pxVZNHz48PDNb34zVQAAbScEoKxKfEoa74/Vdky1dDRkKmInwDvvvBPuuuuuVJFFJ554YujSpUuqAADaTghAWZV6QGrvFW6wNEKAtvvXv/4V5s6dmyqyZoMNNghf+9rXUgUA0D5CAMqqVKu0IwFUS0fmAURFDAHcCpBtxx57bGhqijf7AgC0nxCAsir1gNTRBzVoSUcDpiLOBIidAGTT+uuvH3baaadUAQC0nxCAsnQC0OgcB2ibOXPmhPvuuy9VZM2RRx6pCwAAqAghAGVV6gFJCEA1TJ48Obz++uupap+ihQAxAIhBANmz2mqrhV133TVVAAAdIwSgrEo9IL366qvhrbfeShVURiWOmRQtBLjjjjvSiqw59NBD3QgAAFSMEICyKnleWjcAlVaJ76mizQQwDyCbevToEfbbb79UAQB0nBCAsir5KakQgEqrxPdUkToBYuBx1113pYos2XPPPUPfvn1TBQDQcUIAyhIC0MiEAG3zxBNPhGnTpqWKLPn2t7+dVgAAlSEEoCzHAWhkZgK0zb///e+0IkvWXnvt8KlPfSpVAACVIQSgLJ0ANKpXXnklTJkyJVXtV6SZAK4GzKa99947rQAAKkcIQFmVDAHeeOONDl/nBotUKlQqUieAECCbXAsIAFSDEICyKv0paSXatyESArTNnDlzwiOPPJIqsmKDDTYIQ4YMSRUAQOUIASir0g9IjgRQKUKAtokBwLx581JFVuy4445pBQBQWUIAytIJQKOqVAhQlJkA999/f1qRJVtttVVaAQBUlhCAsnQC0IgWLFigE6CNxo0bl1ZkRZ8+fdwKAABUjRCAsqoRAsQHOOiIl156KUyfPj1VHSMEoFFtsskmoXPnzqkCAKgsIQBlVbpVetq0aeHFF19MFbRPJY+VFCEEiMGbozjZ85nPfCatAAAqTwhAWdV4QHIkgI6q5PdQEWYCPP/882HmzJmpIis23njjtAIAqDwhAGVVIwTwiSQdVckQoAidAI4CZNO6666bVgAAlScEoKxqfEqqE4COEgK0zX/+85+0Iit69eoVVl111VQBAFSeEICydALQaOL59vHjx6eq44pwHODJJ59MK7IiBgBNTU2pAgCoPCEAZVUjBIgPcEW5m53KmzhxYnj77bdT1XFF6AR46qmn0oqsWGWVVdIKAKA6hACUVY2H9VmzZpUGlUF7VPo4iRCARtS/f/+0AgCoDiEAZVXrAcmRANpLCNA2r732Wpg+fXqqyIpll102rQAAqkMIQFnVats3HJD2qvT3Tt6PpugCyKbu3bunFQBAdQgBKEsnAI1GJ0DbPP3002lFlnTq5J9lAKC6vNugLCEAjSR+av/444+nqjLyHgJMmDAhrQAA4H1CAMqqVqt0vLJs3rx5qYLWiQ+0cbBkJeU9BHjhhRfSCgAA3icEoKxqPSDFAMDd5bRVNWZJ5H0mgBAAAIByhACUVc1PSR0JoK3Gjx+fVpWT906AiRMnphUAALxPCEBZ1fyUVAhAW1WjEyDPIUD8+/viiy+mCgAA3icEoCydADQSIUDbvPbaa2ZvAABQVlPz6/jm13GlqoZGjRoVRo4cmSoazbHHHhtOOumkVFXWmmuuGZ599tlUwZLFT7V79+5d8cGAv/vd78JBBx2Uqnx5+OGHw4YbbpgqsmSrrbYK+++/f6oAACprgw02uEcIQFnHHHNMOPnkk1NVWU1NTWH69OmhZ8+eaQdaFgOjYcOGpapyfvvb34aDDz44Vfly0003hW233TZVAADwf3ZzHICyqtkqvWDBgqq0d5NP1fpeyftxAAAAKEcIQFnVvj7NXABaqxo3A0RCAAAAikgIQFnVfkD6z3/+k1awZNXqBKh20FVPQgAAAFoiBKCsaocAOgFoLccB2m7y5MlpBQAAHyYEoCzHAWgE8fvwiSeeSFVl5TkEmDp1aloBAMCHCQEoq9oPSLFd2aeVLM3zzz8fZs+enarKEgIAAFBEQgDKqsUDkm4AlqZaQwGjPM8EmDJlSloBAMCHCQEoqxYPSIYDsjSPP/54WlWeTgAAAIpICEBZtXhAEgKwNNXsBBACAABQREIAyhIC0AiEAG23YMGC8Pbbb6cKAAA+TAhAWbU4DhCvfosPLFBO/N6o1s0AUV5nAsyaNcvfKwAAWiQEoKxafEo6c+bM0vR3KGfSpEml75FqyWsnwDvvvJNWAACwOCEAZdXqU1JHAmhJNY8CRHkNARwFAABgSYQAlFWrByTXBNISIUD76AQAAGBJhACUVasHJJ0AtKSa1wNGeZ0JIAQAAGBJhACU5TgA9aYToH3mzZuXVgAAsDghAGXV6gHpqaeeCnPmzEkVvE8I0D5z585NKwAAWJwQgLJq9YAU//9Uu+2b7Hn55ZfDtGnTUlUdQgAAAIpICEBZtTwv7UgAH1WLYCivMwEcBwAAYEmEAJRVy09JhQB81BNPPJFW1aMTAACAIhICUJYQgHoSArTf/Pnz0woAABYnBKAsxwGoJyFA++X1mAMAAJUhBKCsWj4gxSFwb775ZqrATICOEAIAALAkQgDKqvWDhG4AFpkxY0YpGKq2vHYCLFiwIK0AAGBxQgDKqvUD0rhx49KKoqvFUYDIcQAAAIpICEBZQgDqRQjQMUIAAACWRAhAWbV+kBACsEitQoC8Piw7DgAAwJIIASir1p+SPvbYY7n9ZJa2qcVQwCiv329NTU1pBQAAixMCUFatH5BmzZoVnn322VRRZI4DdIwQAACAJRECUFY9WqUdCWD+/Pk1C4OEAAAAFJEQgLLq8YAkBCAGAPPmzUtVdRmgBwBAEQkBKEsIQD08+eSTaVV9OgEAACgiIQBlOQ5APTz99NNpVX1CAAAAikgIQFn1eECaMGFCmD59eqoooqeeeiqtqi+vIUDnzp3TCgAAFicEoKx6nZd+9NFH04oiqmUIkNeZAJ06+bEOAEDLvFukrHp9SvrII4+kFUWkE6DjhAAAACyJd4uUJQSg1mbMmBFeeeWVVFWfEAAAgCLybpGy6tUqLQQorloOBYyEAAAAFJF3i5RVrwek//znP+5vL6haHgWI8vp9ZjAgAABLIgSgrHqFAO+880545plnUkWR6ASoDJ0AAAAsiXeLlFXPT0kffvjhtKJIat0JkNcQQCcAAABLIgSgrHo+IJkLUExCgMoQAgAAsCRCAMoSAlBrtT4GkteZAI4DAACwJN4tUlY9H5CEAMUzderUMGXKlFTVhk4AAACKSAhAWfV8QHrppZfCm2++mSqK4Lnnnkur2slrCKATAACAJfFukbLq3SqtG6BYhACVoxMAAIAlEQKwmAULFpRe9fTQQw+lFUVQjxDATAAAAIrIu0UW0wifkAoBikUnQOUIAQAAWBLvFllMI3xC+uCDD6YVRSAEqBwhAAAAS+LdIotphIejeGf822+/nSryTghQOUIAAACWxLtFFtMID0exG2HcuHGpIs/mz58fXnjhhVTVjpkAAAAUkXeLLKZRHo4cCSiGSZMmlYKAWtMJAABAEXm3yGIa5eHIcMBiiCFAPQgBAAAoIu8WWYwQgFp66aWX0qq2GuEqTAAAqDUhAItplOMAjz76aJg9e3aqyKt6hQBRHucCNDU1pRUAACxOCMBiGqUTYN68eeHhhx9OFXlVzxAgj0cChAAAACyJEIDFNNKno//+97/TirwSAlSWEAAAgCURArCYRnowuvfee9OKvHrxxRfTqvaEAAAAFI0QgMU00oORToD8MxOgsoQAAAAsSXy3eHzz67hSVUMbbLBBGDJkSKpoJDNnzgxjx45NVf3tvPPOHmxy7Nprr61b8LTDDjuEbt26pSofGu3vLwAADWW3uoUAAAAAQE3t5jgAAAAAFIQQAAAAAApCCAAAAAAFIQQAAACAghACAAAAQEEIAQAAAKAghAAAAABQEEIAAAAAKAghAAAAABSEEAAAAAAKQggAAAAABSEEAAAAgIKIIcD8hUsAAAAgx+bHEGDGwjUAAACQYzNiCPDiwjUAAACQYy/GEGD8wjUAAACQU3OaX8/GEOCJ5tfrcQcAAADIpbsXLFgwr1Pz/1jQXIxeuAcAAADk0A3xf8ROgOji9BUAAADIl3nNr8vjohQCLFiw4B/NX+6PawAAACBXLm9+7n8lLpoWngZoXjQ1bdH85ZZSAQAAAOTB7ObXus3P/s/FYtFxgNgN8LfmL6X2AAAAACAXTlwUAET/1wkQNTU1Ldf8JR4LGFbaAAAAALIqfti/VfNz/3sLyw90AkTNvzC9+ct2zS9XBgIAAEB2/af5tesHA4DoQyFA1PwfPN38ZfPm16TSBgAAAJAlscN/i+bn+6kLy/ctFgJEzf/h+OYvmzS/bi9tAAAAAFlwafNr8+bn+rId/mVDgKj5f+Hl5i9fan4d3PyaEvcAAACAhjSx+bVz87P8Ps2vmQu3FvehwYAtaWpqWr75y8jm1wHNr8FxDwAAAKi7h5tfv2t+Xdz8fD+3tLMErQoBFmlq1vxl4+bXFs2vDZpfQ5pfMSDo3vwCAAAAqiM+vM9qfsVO/TjL777m183Nz/RPNH9tpRD+P85i74uAAvaHAAAAAElFTkSuQmCC'
              }
            }
            pdfMake.createPdf(dd).download()
          })
          .catch(() => { Notify.error('Não foi possível gerar o relatório') })
          .then(() => { this.loading = false })
      }
    }
  }
}
</script>
