'use client';
import React, { useState, useEffect, useRef } from 'react';
import { getMoreTrendsData, saveData } from '@/utils/action';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'

const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'z'];
// const alphabets = ['a', 'b'];
const baseUrl = 'https://www.redbubble.com/typeahead/?term=';

const BubbleTrendsTable = () => {
  const searchParams = useSearchParams();
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let selectedDate = searchParams.get('date');
  console.log('selectedDate', selectedDate);
  
  // useRef to track whether fetchData has been called
  const initialLoad = useRef(false);
  
  useEffect(() => {
    console.log("useEffect called");
    
    // Allow fetchData on initial load or when selectedDate changes
    if (!initialLoad.current || selectedDate) {
      initialLoad.current = true; 
      fetchData();
    }
  }, [selectedDate]);

  const fetchData = async () => {
    setIsLoading(true);
      setError("");
    try { 
      // First, check database for data based on the selectedDate
    const response = await getMoreTrendsData(selectedDate);

    const data = JSON.parse(response);

    const currentDate = new Date().toISOString().slice(0, 10);
    console.log("Current Date:", currentDate);

    // If data is found for the selected date
    if (data && data.length > 0) {
      setKeywords(data.sort((a, b) => a.results - b.results));
      setIsLoading(false);
    } 
    // If no data is found, and the selectedDate is today (current date)
    else if (!selectedDate || selectedDate === currentDate) {
      // Call external API to scrape data for today and store it in the database
      await callAPI();
      setIsLoading(false);
    } 
    // If selectedDate is not today and no data found
    else {
      setKeywords([]);
      setIsLoading(false);
      setError(`No data found.`);
    }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching existing data. Fetching new data...');
      // await callAPI();
    }
  };

  const callAPI = async () => {
    setIsLoading(true);
    setError(null);

    const fetchAlphabetData = async (alphabet) => {
      try {
        const url = `${baseUrl}${alphabet}&locale=en`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(`data from fetch baseUrl ${url}/${alphabet} `, data);

        const alphabetData = await Promise.all(
          data?.data?.trending_searches.map(async (item) => {
            const resultCount = await fetchResultCount(item.keywords);
            return {
              keyword: item.keywords,
              resultCount: resultCount || 'N/A',
            };
          })
        );

        setKeywords(prevKeywords => [...prevKeywords, ...alphabetData].sort((a, b) => a.resultCount - b.resultCount));

        // Save data to the server
        await Promise.all(
          alphabetData.map(async (item) => {
            const dataToSave = {
              trend: item.keyword,
              language: 'en',
              results: item.resultCount === 'N/A' ? 0 : item.resultCount,
            };

            // await fetch('/saveData', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify(dataToSave),
            // });

          await saveData(dataToSave);
          })
        );
      } catch (error) {
        console.error(`Error fetching data for '${alphabet}':`, error);
      }
    };

    // Fetch data for each alphabet concurrently
    await Promise.all(alphabets.map(fetchAlphabetData));

    setIsLoading(false);
  };

  const fetchResultCount = async (keyword) => {
    try {
      const response = await fetch('https://www.redbubble.com/boom/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Referrer-Policy': 'no-referrer',
          'Origin': 'https://www.redbubble.com',
        },
        body: JSON.stringify({
          operationName: 'withSearchResults',
          variables: {
            query: keyword,
            queryParams: {
              queryParamItems: [
                { name: 'query', values: keyword },
                { name: 'ref', values: 'search_box' },
              ],
              searchType: 'find',
            },
            locale: 'en',
            country: 'IN',
            currency: 'USD',
            previewTypeIds: ['product_close', 'alternate_product_close', 'artwork'],
            experience: 'srp',
          },
          query: "query withSearchResults($query: String!, $queryParams: QueryParams, $locale: String!, $country: String!, $currency: String!, $previewTypeIds: [String!], $experience: String) {\n  searchResults(query: $query, queryParams: $queryParams, locale: $locale, country: $country, currency: $currency, previewTypeIds: $previewTypeIds, experience: $experience) {\n    ...Results\n    ...TrendingResults\n    ...Metadata\n    ...Filters\n    ...Pagination\n    ...LandingPage\n    __typename\n  }\n}\n\nfragment Results on SearchResults {\n  results {\n    inventoryItem(locale: $locale, country: $country, currency: $currency, previewTypeIds: $previewTypeIds) {\n      id\n      marketingProductTypeId\n      description\n      productTypeId\n      productPageUrl\n      blankItemId\n      prominentMessage\n      price {\n        id\n        amount\n        currency\n        discount {\n          amount\n          percent\n          __typename\n        }\n        __typename\n      }\n      previewSet {\n        id\n        previews {\n          previewTypeId\n          url\n          __typename\n        }\n        __typename\n      }\n      gaCode\n      gaCategory\n      attributes {\n        name\n        value\n        attributes {\n          name\n          value\n          __typename\n        }\n        __typename\n      }\n      volumeDiscount {\n        id\n        thresholds {\n          percentOff\n          quantity\n          __typename\n        }\n        __typename\n      }\n      experiencesProductCard {\n        name\n        value\n        __typename\n      }\n      __typename\n    }\n    work(locale: $locale) {\n      id\n      title\n      artistName\n      isMatureContent\n      tags\n      __typename\n    }\n    defaultPreviewTypeId\n    groupId\n    rank\n    __typename\n  }\n  __typename\n}\n\nfragment TrendingResults on SearchResults {\n  trendingResults {\n    inventoryItem(locale: $locale, country: $country, currency: $currency, previewTypeIds: $previewTypeIds) {\n      id\n      marketingProductTypeId\n      description\n      productPageUrl\n      productTypeId\n      price {\n        id\n        amount\n        currency\n        __typename\n      }\n      previewSet {\n        id\n        previews {\n          previewTypeId\n          url\n          __typename\n        }\n        __typename\n      }\n      volumeDiscount {\n        id\n        thresholds {\n          percentOff\n          quantity\n          __typename\n        }\n        __typename\n      }\n      gaCode\n      gaCategory\n      attributes {\n        name\n        value\n        attributes {\n          name\n          value\n          __typename\n        }\n        __typename\n      }\n      experiencesProductCard {\n        name\n        value\n        __typename\n      }\n      __typename\n    }\n    work(locale: $locale) {\n      id\n      title\n      artistName\n      isMatureContent\n      tags\n      __typename\n    }\n    defaultPreviewTypeId\n    groupId\n    rank\n    __typename\n  }\n  __typename\n}\n\nfragment Metadata on SearchResults {\n  metadata {\n    title\n    searchContext {\n      category\n      __typename\n    }\n    resultCount\n    topic\n    searchBar {\n      iaCode\n      pillLabel\n      keywords\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment Filters on SearchResults {\n  filters {\n    resetUrl\n    staticFilters {\n      type\n      label\n      options {\n        name\n        label\n        applied\n        url\n        options {\n          name\n          label\n          applied\n          url\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    filters {\n      type\n      label\n      experiences {\n        name\n        value\n        __typename\n      }\n      options {\n        name\n        label\n        applied\n        disabled\n        url\n        hexColor\n        imageUrl\n        __typename\n      }\n      __typename\n    }\n    appliedCount\n    appliedPath\n    resets {\n      label\n      url\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment Pagination on SearchResults {\n  pagination {\n    currentPage\n    perPage\n    showPreviousPageLink\n    showNextPageLink\n    paginationLinks {\n      namedLinks {\n        previousPage {\n          rel\n          url\n          __typename\n        }\n        nextPage {\n          rel\n          url\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    fromNumber\n    toNumber\n    total\n    __typename\n  }\n  __typename\n}\n\nfragment LandingPage on SearchResults {\n  metadata {\n    formattedQuery\n    landingPage {\n      hero {\n        pitch\n        title\n        image\n        color\n        __typename\n      }\n      bubbles {\n        title\n        items {\n          title\n          image\n          realisticImage\n          url\n          isExternal\n          __typename\n        }\n        hasImages\n        __typename\n      }\n      seoMetadata {\n        pageDescription\n        robots\n        canonicalURL\n        searchTitle\n        seoImage\n        alternatePageVersions {\n          href\n          locale\n          __typename\n        }\n        relatedTagLinks {\n          title\n          href\n          text\n          __typename\n        }\n        faq {\n          title\n          items {\n            question\n            answer\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      footer {\n        text\n        readMoreText\n        breadcrumbs {\n          name\n          url\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    relatedTopics {\n      title\n      url\n      __typename\n    }\n    relatedProducts {\n      id\n      url\n      productTitle\n      fullTitle\n      __typename\n    }\n    searchPageType\n    resultCount\n    searchUUID\n    __typename\n  }\n  __typename\n}\n",
        }),
      });

      const data = await response.json();
      // console.log(`data from fetchResultCount `, data);
      return data?.data?.searchResults?.metadata?.resultCount || 'N/A';
    } catch (error) {
      console.error('Error fetching result count:', error);
      return 'N/A';
    }
  };

  return (
    <div className="overflow-x-auto">
    {error && (
      <div className="text-center py-4 text-red-500">{error}</div>
    )}
    <table className="min-w-full bg-white">
      <thead className="bg-[antiquewhite]">
        <tr>
          <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">No.</th>
          <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
          <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Result Count</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {keywords.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-100'}>
            <td className="px-4 py-2">
              {index + 1}
            </td>
            <td className="px-4 py-2">
              <Link className="text-blue-600 hover:underline" href={`https://www.redbubble.com/shop?query=${encodeURIComponent(item.keyword || item.trend)}`} target="_blank" rel="noopener noreferrer">
              {item.keyword || item.trend}
              </Link>
            </td>
            <td className="px-4 py-2">
              {item.resultCount || item.results}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {isLoading && (
      <div className="text-center py-4">Loading more results...</div>
    )}
  </div>
  
  );
};

export default BubbleTrendsTable;