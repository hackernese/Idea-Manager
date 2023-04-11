import style from './style.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

// Welcome to our website, which provides an idea management platform that allows users to create, organize, and share their ideas. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions of use:

// Content Ownership: You retain all ownership rights to any ideas you upload or share on our website. However, by posting or sharing your ideas, you grant us a non-exclusive, royalty-free, transferable, and sub-licensable license to use, reproduce, distribute, and display your ideas on our website.

// Prohibited Uses: You may not use our website for any illegal or unauthorized purpose, including but not limited to copyright infringement or transmission of viruses or malware. You must also refrain from using our website to post offensive, defamatory, or harassing content.

// User Conduct: You are solely responsible for your use of our website and any content you upload or share. You must comply with all applicable laws and regulations, and refrain from engaging in any activity that disrupts or interferes with the operation of our website.

// Intellectual Property: All content and materials on our website, including but not limited to logos, graphics, and text, are protected by intellectual property laws and are the property of our website or our licensors. You may not use our content or materials without our express written permission.

// Disclaimer: Our website is provided on an "as is" and "as available" basis, and we make no representations or warranties of any kind, express or implied, as to the operation of our website or the information, content, materials, or products included on our website.

// Limitation of Liability: To the fullest extent permitted by law, we will not be liable for any damages of any kind arising from the use of our website, including but not limited to direct, indirect, incidental, punitive, and consequential damages.

// Modifications: We reserve the right to modify or update these terms and conditions at any time, without prior notice. By continuing to use our website after any such modification, you agree to be bound by the revised terms.

// Governing Law: These terms and conditions are governed by and construed in accordance with the laws of [insert your jurisdiction]. Any disputes arising from these terms and conditions will be resolved exclusively in the courts of [insert your jurisdiction].

// Thank you for using our website. If you have any questions or concerns about these terms and conditions, please contact us at [insert your contact information].

function TermAndCondition() {
    return (
        <div className={cx('tandc')}>
            <div>
                <div>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
            </div>
        </div>
    );
}

export default TermAndCondition;
