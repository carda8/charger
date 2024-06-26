import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from 'styles/GlobalStyles';
import HeaderCenter from '@components/HeaderCenter';

const PolicyPersonal = () => {
  return (
    <SafeAreaView style={{...GlobalStyles.safeAreaStyle}}>
      <HeaderCenter title="개인정보 수집 및 이용 동의 " leftBack />
      <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
        <Text>{`마이차저 개인정보 취급방침

우리기업은 고객님의 개인정보를 중요시하며, “정보통신망 이용촉진 및 정보보호”에 관한 법률을 준수하고 있습니다.
우리기업은 개인정보취급방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
우리기업은 개인정보취급방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.
ο 본 방침은 : 2023 년 01 월 31 일 부터 시행됩니다.

제1장 수집하는 개인정보 항목
우리기업은 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
1. 수집항목 : 이름 , 로그인ID , 비밀번호 , 자택 전화번호 , 자택 주소 , 휴대전화번호 , 이메일 , 회사명 , 서비스 이용기록 , 접속 로그 , 쿠키 , 접속 IP 정보 , 결제기록
2. 개인정보 수집방법 : 홈페이지(회원가입)

제2장 개인정보의 수집 및 이용목적
우리기업은 수집한 개인정보를 다음의 목적을 위해 활용합니다.
1. 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산, 콘텐츠 제공 , 구매 및 요금 결제
2. 회원 관리, 회원제 서비스 이용에 따른 본인확인 , 개인 식별 , 불량회원의 부정 이용 방지와 비인가 사용 방지 , 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인 , 불만처리 등 민원처리 , 고지사항 전달
3. 마케팅 및 광고에 활용
신규 서비스(제품) 개발 및 특화 , 이벤트 등 광고성 정보 전달 , 인구통계학적 특성에 따른 서비스 제공 및 광고 게재 , 접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계
제3장 개인정보의 보유 및 이용기간
[계약 또는 청약철회 등에 관한 기록보존] – 보존 사유 : 전자상거래 등에서의 소비자보호에 관한 법률 제6조 및 시행령 제6조(사업자가 보존하는 거래기록의 대상등)
– 보존 기간 : 5년 [대금결제 및 재화 등의 공급에 관한 기록보존 사유] – 전자상거래 등에서의 소비자보호에 관한 법률 제6조 및 시행령 제6조(사업자가 보존하는 거래기록의 대상등)
– 보존 기간 : 5년 [소비자의 불만 또는 분쟁처리에 관한 기록보존 사유] – 전자상거래 등에서의 소비자보호에 관한 법률 제6조 및 시행령 제6조(사업자가 보존하는 거래기록의 대상등)
– 보존 기간 : 3년 [본인확인에 관한 기록보존 사유] – 정보통신망 이용촉진 및 정보보호에 관한 법률 제44조의5 및 시행령 제29조(본인확인조치)
– 보존 기간 : 6개월 [웹사이트 방문기록보존 사유] – 통신비밀보호법 및 시행령 제41조(전기통신사업자의 협조의무 등)
– 보존 기간 : 3개월
제4장 개인정보의 파기절차 및 방법
우리기업은 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.
1. 파기절차
-회원님이 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기되어집니다.
별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유되어지는 이외의 다른 목적으로 이용되지 않습니다.
2. 파기방법
– 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
제5장 개인정보 제공
우리기업은 이용자의 개인정보를 약관에 명시한 범위를 넘어 이용하거나, 제3자에게 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
1. 이용자들이 사전에 동의한 경우
2. 진흥원이 제공하는 도메인이름 검색서비스(WHOIS서비스)
3. 법률에 특별한 규정이 있는 경우
4. 정부기관이 해당 법률에서 정하는 소관업무를 수행하기 위하여 정보를 요청하는 경우
제6장 수집한 개인정보의 위탁
우리기업은 고객님의 동의없이 고객님의 정보를 외부 업체에 위탁하지 않습니다. 향후 그러한 필요가 생길 경우, 위탁 대상자와 위탁 업무 내용에 대해 고객님에게 통지하고 필요한 경우 사전 동의를 받도록 하겠습니다.
제7장 이용자 및 법정대리인의 권리와 그 행사방법
이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다.
이용자들의 개인정보 조회,수정을 위해서는 ‘개인정보변경’(또는 ‘회원정보수정’ 등)을 가입해지(동의철회)를 위해서는 “회원탈퇴”를 클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.
혹은 개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하시면 지체없이 조치하겠습니다.
귀하가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체없이 통지하여 정정이 이루어지도록 하겠습니다.
우리기업은 이용자의 요청에 의해 해지 또는 삭제된 개인정보는 “회사가 수집하는 개인정보의 보유 및 이용기간”에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.
제8장 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항
우리기업은 귀하의 정보를 수시로 저장하고 찾아내는 ‘쿠키(cookie)’ 등을 운용합니다.
쿠키란 웹사이트를 운영하는데 이용되는 서버가 귀하의 브라우저에 보내는 아주 작은 텍스트 파일로서 귀하의 컴퓨터 하드디스크에 저장됩니다. 우리기업은 다음과 같은 목적을 위해 쿠키를 사용합니다.
1. 쿠키 등 사용 목적
– 회원과 비회원의 접속 빈도나 방문 시간 등을 분석, 이용자의 취향과 관심분야를 파악 및 자취 추적, 각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공 귀하는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 귀하는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
2. 쿠키 설정 거부 방법
예: 쿠키 설정을 거부하는 방법으로는 회원님이 사용하시는 웹 브라우저의 옵션을 선택함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.
3. 설정방법 예(인터넷 익스플로어의 경우)
: 웹 브라우저 상단의 도구 > 인터넷 옵션 > 개인정보
단, 귀하께서 쿠키 설치를 거부하였을 경우 서비스 제공에 어려움이 있을 수 있습니다.
제9장 개인정보에 관한 민원서비스
우리기업은 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보관리책임자를 지정하고 있습니다.
개인정보관리책임자 성명 : 석진혁
전화번호 : 010-9342-1014
이메일 : ceoseok@scsev.net
귀하께서는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보관리책임자 혹은 담당부서로 신고하실 수 있습니다. 우리기업은 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.
기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.
1.개인분쟁조정위원회 (www.1336.or.kr/1336)
2.정보보호마크인증위원회 (www.eprivacy.or.kr/02-580-0533~4)
3.대검찰청 인터넷범죄수사센터 (http://icic.sppo.go.kr/02-3480-3600)
4.경찰청 사이버테러대응센터 (www.ctrc.go.kr/02-392-0330)
`}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PolicyPersonal;
